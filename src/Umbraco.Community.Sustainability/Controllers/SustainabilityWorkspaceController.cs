#if NET8_0
using System.Text.Json;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
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

        [HttpGet("getPageData")]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> GetPageData([FromQuery] int pageId)
        {
            var pageMetrics = await _pageMetricService.GetPageMetrics(pageId);
            var mostRecent = pageMetrics.OrderByDescending(x => x.RequestDate).FirstOrDefault();
            if (mostRecent?.PageData == null)
            {
                return Ok("No recent data found");
            }

            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityResponse>(mostRecent.PageData);
            return Ok(sustainabilityData);
        }

        [HttpGet("checkPage")]
        public async Task<IActionResult> CheckPage([FromQuery] int pageId)
        {
            var contentItem = _contentQuery.Content(pageId);
            if (contentItem == null)
            {
                return Ok("Page not found");
            }

            var url = contentItem.Url(mode: UrlMode.Absolute);
            var sustainabilityData = await _sustainabilityService.GetSustainabilityData(url);

            return Ok(sustainabilityData);
        }

        [HttpPost("savePageData")]
        public async Task<IActionResult> SavePageData([FromQuery] int pageId, [FromBody] SustainabilityResponse data)
        {
            if (data.TotalSize == 0)
            {
                return Ok("Missing data to update");
            }

            var pageMetric = new PageMetric()
            {
                NodeId = pageId,
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
    }
}
#endif
