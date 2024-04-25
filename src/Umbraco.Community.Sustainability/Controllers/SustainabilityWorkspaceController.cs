#if NET8_0
using System.Text.Json;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "sustainability")]
    public class SustainabilityWorkspaceController : SustainabilityWorkspaceControllerBase
    {
        private readonly IPublishedContentQuery _contentQuery;
        private readonly IPageMetricService _pageMetricService;
        private readonly ISustainabilityService _sustainabilityService;

        public SustainabilityWorkspaceController(
            IPublishedContentQuery contentQuery,
            IPageMetricService pageMetricService,
            ISustainabilityService sustainabilityService)
        {
            _contentQuery = contentQuery;
            _pageMetricService = pageMetricService;
            _sustainabilityService = sustainabilityService;
        }

        [HttpGet("getOverviewData")]
        [ProducesResponseType(typeof(PagedResult<PageMetric>), 200)]
        public async Task<IActionResult> GetOverviewData(int pageNumber = 1, int pageSize = 10, string orderBy = nameof(PageMetric.CarbonRating), Direction direction = Direction.Ascending)
        {
            var overviewMetrics = await _pageMetricService.GetOverviewMetrics();
            int total = overviewMetrics.Count();

            var filteredMetrics = overviewMetrics;

            Func<PageMetric, object?>? filter = null;
            switch (orderBy)
            {
                case nameof(PageMetric.CarbonRating):
                    filter = x => GetCarbonRatingOrder(x.CarbonRating);
                    break;
                case nameof(PageMetric.RequestDate):
                    filter = x => x.RequestDate;
                    break;
                case nameof(PageMetric.TotalSize):
                    filter = x => x.TotalSize;
                    break;
                case nameof(PageMetric.TotalEmissions):
                    filter = x => x.TotalEmissions;
                    break;
            }

            if (filter != null)
            {
                filteredMetrics = direction == Direction.Ascending ?
                    filteredMetrics.OrderBy(filter) : filteredMetrics.OrderByDescending(filter);
            }

            filteredMetrics = filteredMetrics.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            PagedResult<PageMetric> pagedMetrics = new PagedResult<PageMetric>(total, pageNumber, pageSize)
            {
                Items = filteredMetrics
            };

            return Ok(pagedMetrics);
        }

        [HttpGet("getAverageData")]
        [ProducesResponseType(typeof(AveragePageMetrics), 200)]
        public async Task<IActionResult> GetAverageData()
        {
            var averageMetrics = await _pageMetricService.GetAverageMetrics();

            return Ok(averageMetrics);
        }

        [HttpGet("getPageData")]
        [ProducesResponseType(typeof(SustainabilityResponse), 200)]
        public async Task<IActionResult> GetPageData([FromQuery] string pageGuid)
        {
            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);
                if (contentItem == null)
                {
                    return NoContent();
                }

                var pageMetrics = await _pageMetricService.GetPageMetrics(contentItem.Id);
                var mostRecent = pageMetrics.OrderByDescending(x => x.RequestDate).FirstOrDefault();
                if (mostRecent?.PageData == null)
                {
                    return NoContent();
                }

                var sustainabilityData = JsonSerializer.Deserialize<SustainabilityResponse>(mostRecent.PageData);
                return Ok(sustainabilityData);
            }

            return NoContent();
        }

        [HttpGet("checkPage")]
        [ProducesResponseType(typeof(SustainabilityResponse), 200)]
        public async Task<IActionResult> CheckPage([FromQuery] string pageGuid)
        {
            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);
                if (contentItem == null)
                {
                    return Ok("Page not found");
                }

                var url = contentItem.Url(mode: UrlMode.Absolute);
                var sustainabilityData = await _sustainabilityService.GetSustainabilityData(url);

                return Ok(sustainabilityData);
            }

            return NoContent();
        }

        [HttpPost("savePageData")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> SavePageData([FromQuery] string pageGuid, [FromBody] SustainabilityResponse data)
        {
            if (data.TotalSize == 0)
            {
                return Ok(false);
            }

            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);

                if (contentItem == null)
                {
                    return Ok(false);
                }

                var pageMetric = new PageMetric()
                {
                    NodeId = contentItem.Id,
                    RequestedBy = "Admin",
                    RequestDate = data.LastRunDate,
                    TotalSize = data.TotalSize,
                    TotalEmissions = Convert.ToDecimal(data.TotalEmissions),
                    CarbonRating = data.CarbonRating,
                    PageData = JsonSerializer.Serialize(data),
                };

                await _pageMetricService.AddPageMetric(pageMetric);
                return Ok(true);
            }

            return Ok(false);
        }

        private int GetCarbonRatingOrder(string carbonRating)
        {
            switch (carbonRating)
            {
                case "A+":
                    return 1;
                case "A":
                    return 2;
                case "B":
                    return 3;
                case "C":
                    return 4;
                case "D":
                    return 5;
                case "E":
                    return 6;
                case "F":
                    return 7;
                default:
                    return 7;
            }
        }
    }
}
#endif
