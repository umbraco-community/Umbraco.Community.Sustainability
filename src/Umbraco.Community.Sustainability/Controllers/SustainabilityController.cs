using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class SustainabilityController : UmbracoAuthorizedApiController
    {
        private readonly IPublishedContentQuery _contentQuery;
        private readonly IPageMetricService _pageMetricService;
        private readonly ISustainabilityService _sustainabilityService;

        public SustainabilityController(
            IPublishedContentQuery contentQuery,
            IPageMetricService pageMetricService,
            ISustainabilityService sustainabilityService)
        {
            _contentQuery = contentQuery;
            _pageMetricService = pageMetricService;
            _sustainabilityService = sustainabilityService;
        }

        [HttpGet]
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

        public async Task<IActionResult> GetAverageData()
        {
            var averageMetrics = await _pageMetricService.GetAverageMetrics();

            return Ok(averageMetrics);
        }

        [HttpGet]
        public async Task<IActionResult> GetPageData([FromQuery] Guid pageKey)
        {
            var pageMetrics = await _pageMetricService.GetPageMetrics(pageKey);
            var mostRecent = pageMetrics.OrderByDescending(x => x.RequestDate).FirstOrDefault();
            if (mostRecent?.PageData == null)
            {
                return Ok("No recent data found");
            }

            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityResponse>(mostRecent.PageData);
            return Ok(sustainabilityData);
        }

        [HttpGet]
        public async Task<IActionResult> CheckPage([FromQuery] Guid pageKey)
        {
            var contentItem = _contentQuery.Content(pageKey);
            if (contentItem == null)
            {
                return Ok("Page not found");
            }

            var url = contentItem.Url(mode: UrlMode.Absolute);
            var sustainabilityData = await _sustainabilityService.GetSustainabilityData(url);

            return Ok(sustainabilityData);
        }

        [HttpPost]
        public async Task<IActionResult> SavePageData([FromQuery] Guid pageKey, [FromBody] SustainabilityResponse data)
        {
            if (data.TotalSize == 0)
            {
                return Ok("Missing data to update");
            }

            var pageMetric = new PageMetric()
            {
                NodeKey = pageKey,
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

        private int GetCarbonRatingOrder(string? carbonRating)
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
                default:
                    return 7;
            }
        }
    }
}
