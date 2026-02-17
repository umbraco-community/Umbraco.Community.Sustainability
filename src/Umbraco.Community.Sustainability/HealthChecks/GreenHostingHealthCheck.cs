using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Umbraco.Cms.Core.HealthChecks;
using Umbraco.Cms.Core.Hosting;
using Umbraco.Cms.Core.Services;

namespace Umbraco.Community.Sustainability.HealthChecks
{
    [HealthCheck(
        "1B4A3E0A-6C2D-4F3E-9A8B-7C5D6E4F3A2B",
        "Green Hosting",
        Description = "Checks if your website is hosted on green infrastructure using The Green Web Foundation API.",
        Group = "Sustainability")]
    public class GreenHostingHealthCheck : HealthCheck
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ILocalizedTextService _textService;

        public GreenHostingHealthCheck(
            IHttpClientFactory httpClientFactory,
            IHostingEnvironment hostingEnvironment,
            ILocalizedTextService textService)
        {
            _httpClientFactory = httpClientFactory;
            _hostingEnvironment = hostingEnvironment;
            _textService = textService;
        }

        public override async Task<IEnumerable<HealthCheckStatus>> GetStatusAsync()
        {
            var hostname = _hostingEnvironment.ApplicationMainUrl?.Host;

            if (string.IsNullOrEmpty(hostname))
            {
                return new[]
                {
                    new HealthCheckStatus(
                        "Unable to determine hostname from application URL.")
                    {
                        ResultType = StatusResultType.Warning
                    }
                };
            }

            try
            {
                var httpClient = _httpClientFactory.CreateClient("GreenWebFoundation");
                httpClient.Timeout = TimeSpan.FromSeconds(10);

                var response = await httpClient.GetAsync(
                    $"https://api.thegreenwebfoundation.org/greencheck/{hostname}");

                if (!response.IsSuccessStatusCode)
                {
                    return new[]
                    {
                        new HealthCheckStatus(
                            "Unable to check green hosting status. The Green Web Foundation API returned an error.")
                        {
                            ResultType = StatusResultType.Warning,
                            Description = $"HTTP {response.StatusCode}"
                        }
                    };
                }

                var result = await response.Content.ReadFromJsonAsync<GreenWebCheckResponse>();

                if (result?.Green == true)
                {
                    var message = $"✓ Your site is hosted on green infrastructure!";
                    if (!string.IsNullOrEmpty(result.HostingProvider))
                    {
                        message += $"\n\nHosting provider: {result.HostingProvider}";
                    }

                    return new[]
                    {
                        new HealthCheckStatus(message)
                        {
                            ResultType = StatusResultType.Success,
                            Description = "Your hosting provider uses renewable energy or carbon offsets."
                        }
                    };
                }
                else
                {
                    return new[]
                    {
                        new HealthCheckStatus(
                            "Your site is not currently hosted on verified green infrastructure.")
                        {
                            ResultType = StatusResultType.Warning,
                            Description = "Consider switching to a green hosting provider to reduce your website's environmental impact.",
                            Actions = new[]
                            {
                                new HealthCheckAction("findGreenHost", Id)
                                {
                                    Name = "Find Green Hosting Providers",
                                    Description = "Browse The Green Web Foundation's directory of green hosting providers.",
                                    ValueRequired = false
                                }
                            }
                        }
                    };
                }
            }
            catch (TaskCanceledException)
            {
                return new[]
                {
                    new HealthCheckStatus(
                        "The green hosting check timed out.")
                    {
                        ResultType = StatusResultType.Warning,
                        Description = "Unable to reach The Green Web Foundation API."
                    }
                };
            }
            catch (Exception ex)
            {
                return new[]
                {
                    new HealthCheckStatus(
                        "An error occurred while checking green hosting status.")
                    {
                        ResultType = StatusResultType.Warning,
                        Description = ex.Message
                    }
                };
            }
        }

        public override HealthCheckStatus ExecuteAction(HealthCheckAction action)
        {
            if (action.Alias == "findGreenHost")
            {
                return new HealthCheckStatus(
                    "Opening The Green Web Foundation directory...")
                {
                    ResultType = StatusResultType.Info,
                    Description = "Visit: https://www.thegreenwebfoundation.org/directory/"
                };
            }

            return new HealthCheckStatus("Unknown action.")
            {
                ResultType = StatusResultType.Error
            };
        }

        private class GreenWebCheckResponse
        {
            [JsonPropertyName("green")]
            public bool Green { get; set; }

            [JsonPropertyName("hosted_by")]
            public string? HostingProvider { get; set; }

            [JsonPropertyName("url")]
            public string? Url { get; set; }
        }
    }
}
