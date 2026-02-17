using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.HealthChecks;
using Umbraco.Cms.Core.Services;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability.HealthChecks
{
    [HealthCheck(
        "3D6C5E2C-8E4F-4B66-9C0D-7F8A9B0C1D2E",
        "Page Coverage",
        Description = "Reports on the percentage of published pages that have been tested for sustainability.",
        Group = "Sustainability")]
    public class PageCoverageHealthCheck : HealthCheck
    {
        private readonly IPageMetricService _pageMetricService;
        private readonly IContentService _contentService;
        private readonly ILocalizedTextService _textService;
        private readonly SustainabilityHealthCheckSettings _settings;

        public PageCoverageHealthCheck(
            IPageMetricService pageMetricService,
            IContentService contentService,
            ILocalizedTextService textService,
            IOptions<SustainabilityHealthCheckSettings> settings)
        {
            _pageMetricService = pageMetricService;
            _contentService = contentService;
            _textService = textService;
            _settings = settings.Value;
        }

        public override async Task<IEnumerable<HealthCheckStatus>> GetStatusAsync()
        {
            // Get total published pages
            var totalPublished = _contentService.CountPublished();

            if (totalPublished == 0)
            {
                return new[]
                {
                    new HealthCheckStatus(
                        "No published pages found.")
                    {
                        ResultType = StatusResultType.Info,
                        Description = "Publish some content to see sustainability coverage statistics."
                    }
                };
            }

            // Get coverage data
            var coverageData = await _pageMetricService.GetPageCoverageData(_settings.StaleDays);
            var testedCount = coverageData.TestedPageCount;
            var staleCount = coverageData.StalePageCount;
            var coveragePercentage = (testedCount * 100.0) / totalPublished;

            var message = $"Sustainability test coverage: {coveragePercentage:F1}%\n\n" +
                         $"Tested pages: {testedCount} of {totalPublished}";

            if (staleCount > 0)
            {
                message += $"\nStale metrics: {staleCount} page(s) not tested in {_settings.StaleDays} days";
            }

            // Determine result type based on coverage and staleness
            StatusResultType resultType;
            string? description;

            if (coveragePercentage >= 80 && staleCount == 0)
            {
                resultType = StatusResultType.Success;
                description = "Excellent coverage! Most of your pages have recent sustainability metrics.";
            }
            else if (coveragePercentage >= 50)
            {
                resultType = StatusResultType.Warning;
                if (staleCount > 0)
                {
                    description = $"Good coverage, but {staleCount} page(s) have stale metrics (older than {_settings.StaleDays} days). " +
                                 "Consider re-testing pages regularly to track improvements.";
                }
                else
                {
                    description = "Good coverage, but consider testing more pages to get a complete picture of your site's sustainability.";
                }
            }
            else
            {
                resultType = StatusResultType.Error;
                description = $"Low coverage. Only {testedCount} of {totalPublished} pages have been tested. " +
                             "Run sustainability checks on more pages to understand your site's environmental impact. " +
                             "You can check individual pages from the content editor, or use the Site Check feature " +
                             "to test all pages at once.";
            }

            return new[]
            {
                new HealthCheckStatus(message)
                {
                    ResultType = resultType,
                    Description = description
                }
            };
        }

        public override HealthCheckStatus ExecuteAction(HealthCheckAction action)
        {
            return new HealthCheckStatus("No actions available for this health check.")
            {
                ResultType = StatusResultType.Info
            };
        }
    }
}
