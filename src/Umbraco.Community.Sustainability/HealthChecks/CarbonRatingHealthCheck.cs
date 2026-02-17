using Umbraco.Cms.Core.HealthChecks;
using Umbraco.Cms.Core.Services;
using Umbraco.Community.Sustainability.Helpers;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability.HealthChecks
{
    [HealthCheck(
        "2C5B4F1B-7D3E-4A5F-8B9C-6E7F8A9B0C1D",
        "Site Carbon Rating",
        Description = "Evaluates your website's overall carbon footprint based on average page metrics.",
        Group = "Sustainability")]
    public class CarbonRatingHealthCheck : HealthCheck
    {
        private readonly IPageMetricService _pageMetricService;

        public CarbonRatingHealthCheck(IPageMetricService pageMetricService)
        {
            _pageMetricService = pageMetricService;
        }

        public override async Task<IEnumerable<HealthCheckStatus>> GetStatusAsync()
        {
            var averageMetrics = await _pageMetricService.GetAverageMetrics();

            // No data available
            if (!averageMetrics.Emissions.HasValue || averageMetrics.Emissions == 0)
            {
                return new[]
                {
                    new HealthCheckStatus(
                        "No sustainability data available yet.")
                    {
                        ResultType = StatusResultType.Info,
                        Description = "Run sustainability checks on your pages to see your carbon rating. " +
                                     "Visit any content page and use the 'Check Sustainability' action."
                    }
                };
            }

            var grade = CarbonRatingHelper.CalculateGrade((double)averageMetrics.Emissions.Value);
            var emissionsFormatted = $"{averageMetrics.Emissions.Value:F3}g";
            var pageSizeFormatted = $"{(averageMetrics.PageSize ?? 0) / 1024:F2}KB";

            var message = $"Your site's average carbon rating is: {grade}\n\n" +
                         $"Average emissions: {emissionsFormatted} CO₂ per page view\n" +
                         $"Average page size: {pageSizeFormatted}";

            // Determine result type and add recommendations
            StatusResultType resultType;
            string? recommendations = null;

            switch (grade)
            {
                case "A+":
                case "A":
                    resultType = StatusResultType.Success;
                    recommendations = "Excellent! Your site has a very low carbon footprint. Keep up the good work!";
                    break;

                case "B":
                case "C":
                    resultType = StatusResultType.Success;
                    recommendations = "Good performance. Consider optimizing images and reducing JavaScript to improve further.";
                    break;

                case "D":
                    resultType = StatusResultType.Warning;
                    recommendations = "Your site's carbon footprint could be improved. Consider:\n" +
                                    "• Optimizing and compressing images\n" +
                                    "• Minimizing JavaScript and CSS\n" +
                                    "• Implementing lazy loading for media\n" +
                                    "• Using modern image formats (WebP, AVIF)";
                    break;

                case "E":
                case "F":
                    resultType = StatusResultType.Error;
                    recommendations = "Your site has a high carbon footprint. Take action:\n" +
                                    "• Review and optimize large images and media files\n" +
                                    "• Remove unused JavaScript libraries and CSS\n" +
                                    "• Enable compression and caching\n" +
                                    "• Consider using a CDN\n" +
                                    "• Audit third-party scripts and tracking pixels";
                    break;

                default:
                    resultType = StatusResultType.Info;
                    break;
            }

            return new[]
            {
                new HealthCheckStatus(message)
                {
                    ResultType = resultType,
                    Description = recommendations
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
