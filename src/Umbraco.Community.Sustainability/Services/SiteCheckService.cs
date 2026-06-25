using System.Runtime.CompilerServices;
using System.Threading.Channels;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Community.Sustainability.Services.Discovery;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Services
{
    /// <summary>
    /// Orchestrates site-wide sustainability checks.
    /// Discovers URLs using multiple strategies, runs checks in parallel, and streams progress via SSE.
    /// </summary>
    public class SiteCheckService : ISiteCheckService
    {
        private static readonly SemaphoreSlim _runningGuard = new(1, 1);
        private bool _isRunning = false;

        private readonly IEnumerable<IUrlDiscoveryStrategy> _discoveryStrategies;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly SustainabilitySettings _settings;
        private readonly ILogger<SiteCheckService> _logger;

        public bool IsRunning => _isRunning;

        public SiteCheckService(
            IEnumerable<IUrlDiscoveryStrategy> discoveryStrategies,
            IServiceScopeFactory serviceScopeFactory,
            IOptions<SustainabilitySettings> options,
            ILogger<SiteCheckService> logger)
        {
            _discoveryStrategies = discoveryStrategies.OrderByDescending(x => x.Priority);
            _serviceScopeFactory = serviceScopeFactory;
            _settings = options.Value;
            _logger = logger;
        }

        public async IAsyncEnumerable<SiteCheckProgressDto> StartSiteCheckAsync(
            string baseUrl,
            string applicationUrl,
            [EnumeratorCancellation] CancellationToken ct)
        {
            // Guard against concurrent runs
            if (!await _runningGuard.WaitAsync(0))
            {
                yield return new SiteCheckProgressDto
                {
                    Type = "error",
                    Error = "A site check is already running. Please wait for it to complete."
                };
                yield break;
            }

            _isRunning = true;
            try
            {
                await foreach (var progress in InternalStartSiteCheckAsync(baseUrl, applicationUrl, ct))
                {
                    yield return progress;
                }
            }
            finally
            {
                _isRunning = false;
                _runningGuard.Release();
            }
        }

        private async IAsyncEnumerable<SiteCheckProgressDto> InternalStartSiteCheckAsync(
            string baseUrl,
            string applicationUrl,
            [EnumeratorCancellation] CancellationToken ct)
        {
            // Create timeout CTS from settings
            var timeoutCts = new CancellationTokenSource();
            if (_settings.MaxCheckDurationMinutes > 0)
            {
                timeoutCts.CancelAfter(TimeSpan.FromMinutes(_settings.MaxCheckDurationMinutes));
            }

            // Link with request CTS
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct, timeoutCts.Token);

            // Channel for progress events
            var channel = Channel.CreateUnbounded<SiteCheckProgressDto>();

            // Start discovery and checking in background
            var checkTask = RunCheckAsync(baseUrl, applicationUrl, channel, linkedCts);

            // Yield results from channel while check is running
            await foreach (var progress in channel.Reader.ReadAllAsync(linkedCts.Token))
            {
                yield return progress;
            }

            // Ensure background task completes
            try
            {
                await checkTask;
            }
            catch
            {
                // Error already written to channel
            }
        }

        private async Task RunCheckAsync(
            string baseUrl,
            string applicationUrl,
            Channel<SiteCheckProgressDto> channel,
            CancellationTokenSource linkedCts)
        {
            try
            {
                await DiscoverAndCheckAsync(baseUrl, applicationUrl, channel, linkedCts.Token);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Site check was cancelled");
                await channel.Writer.WriteAsync(new SiteCheckProgressDto
                {
                    Type = "error",
                    Error = "Site check was cancelled or timed out."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Site check failed");
                await channel.Writer.WriteAsync(new SiteCheckProgressDto
                {
                    Type = "error",
                    Error = $"Site check failed: {ex.Message}"
                });
            }
            finally
            {
                channel.Writer.Complete();
                linkedCts.Dispose();
            }
        }

        private async Task DiscoverAndCheckAsync(
            string baseUrl,
            string applicationUrl,
            Channel<SiteCheckProgressDto> channel,
            CancellationToken ct)
        {
            try
            {
                // Discover URLs using all strategies, deduplicate by URL
                var discoveredUrls = new Dictionary<string, DiscoveredUrl>();
                foreach (var strategy in _discoveryStrategies)
                {
                    if (ct.IsCancellationRequested) break;

                    try
                    {
                        var urls = await strategy.DiscoverUrlsAsync(baseUrl, ct);
                        foreach (var url in urls)
                        {
                            if (!discoveredUrls.ContainsKey(url.Url))
                            {
                                discoveredUrls[url.Url] = url;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Discovery strategy {Strategy} failed", strategy.Name);
                    }
                }

                // Notify discovery complete
                var totalPages = discoveredUrls.Count;
                await channel.Writer.WriteAsync(new SiteCheckProgressDto
                {
                    Type = "discovery",
                    TotalPages = totalPages
                }, ct);

                if (totalPages == 0)
                {
                    await channel.Writer.WriteAsync(new SiteCheckProgressDto
                    {
                        Type = "error",
                        Error = "No pages discovered to check."
                    }, ct);
                    channel.Writer.Complete();
                    return;
                }

                // Create action block for parallel checking
                var semaphore = new SemaphoreSlim(_settings.MaxConcurrentChecks);
                int pagesCompleted = 0;

                var checkTasks = discoveredUrls.Select(async kvp =>
                {
                    if (ct.IsCancellationRequested) return;

                    await semaphore.WaitAsync(ct);
                    try
                    {
                        // Create a new scope for this parallel task
                        using var scope = _serviceScopeFactory.CreateScope();
                        var sustainabilityService = scope.ServiceProvider.GetRequiredService<ISustainabilityService>();
                        var pageMetricService = scope.ServiceProvider.GetRequiredService<IPageMetricService>();

                        var discoveredUrl = kvp.Value;
                        var result = await CheckPageAsync(discoveredUrl, applicationUrl, sustainabilityService, pageMetricService, ct);
                        result.TotalPages = totalPages;
                        result.PagesCompleted = Interlocked.Increment(ref pagesCompleted);

                        await channel.Writer.WriteAsync(result, ct);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to check page {Url}", kvp.Key);
                        await channel.Writer.WriteAsync(new SiteCheckProgressDto
                        {
                            Type = "error",
                            Url = kvp.Key,
                            Error = ex.Message,
                            TotalPages = totalPages,
                            PagesCompleted = Interlocked.Increment(ref pagesCompleted)
                        }, ct);
                    }
                    finally
                    {
                        semaphore.Release();
                    }
                });

                await Task.WhenAll(checkTasks);
                channel.Writer.Complete();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Discovery and check failed");
                await channel.Writer.WriteAsync(new SiteCheckProgressDto
                {
                    Type = "error",
                    Error = $"Check process failed: {ex.Message}"
                });
                channel.Writer.Complete();
            }
        }

        private async Task<SiteCheckProgressDto> CheckPageAsync(
            DiscoveredUrl url,
            string applicationUrl,
            ISustainabilityService sustainabilityService,
            IPageMetricService pageMetricService,
            CancellationToken ct)
        {
            try
            {
                var response = await sustainabilityService.GetSustainabilityData(url.Url, applicationUrl);

                var pageMetric = new PageMetric
                {
                    NodeKey = url.NodeKey,
                    RequestDate = DateTime.UtcNow,
                    TotalSize = response.TotalSize,
                    TotalEmissions = (decimal)response.TotalEmissions,
                    CarbonRating = response.CarbonRating,
                    PageData = System.Text.Json.JsonSerializer.Serialize(response)
                };

                await pageMetricService.AddPageMetric(pageMetric);

                return new SiteCheckProgressDto
                {
                    Type = "result",
                    Url = url.Url,
                    NodeKey = url.NodeKey,
                    NodeName = url.NodeName,
                    Success = true,
                    CarbonRating = response.CarbonRating,
                    TotalSize = response.TotalSize,
                    TotalEmissions = (decimal)response.TotalEmissions
                };
            }
            catch (Exception ex)
            {
                return new SiteCheckProgressDto
                {
                    Type = "error",
                    Url = url.Url,
                    NodeKey = url.NodeKey,
                    NodeName = url.NodeName,
                    Success = false,
                    Error = ex.Message
                };
            }
        }
    }
}
