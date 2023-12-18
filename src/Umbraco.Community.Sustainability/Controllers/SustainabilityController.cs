using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class SustainabilityController : UmbracoApiController
    {
        private readonly IPublishedContentQuery _contentQuery;
        private readonly ISustainabilityService _sustainabilityService;

        public SustainabilityController(IPublishedContentQuery contentQuery, ISustainabilityService sustainabilityService)
        {
            _contentQuery = contentQuery;
            _sustainabilityService = sustainabilityService;
        }

        [HttpGet]
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

        [HttpPost]
        public IActionResult SavePageData([FromBody] PageDataModel model)
        {
            var data = model;
            return Ok(true);
        }
    }
}
