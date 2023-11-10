using Microsoft.AspNetCore.Mvc;
using Microsoft.Playwright;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class SustainabilityController : UmbracoApiController
    {
        private readonly IPublishedContentQuery _contentQuery;

        public SustainabilityController(IPublishedContentQuery contentQuery)
        {
            _contentQuery = contentQuery;
        }

        [HttpGet]
        public async Task<IActionResult> CheckPage([FromQuery] int pageId)
        {
            IPublishedContent? contentItem = _contentQuery.Content(pageId);
            string? url = contentItem?.Url(mode: UrlMode.Absolute);

            return Ok(await CalculateRenderedPageSize(url));
        }

        [HttpPost]
        public IActionResult SavePageData([FromBody] PageDataModel model)
        {
            var data = model;
            return Ok(true);
        }

        private async Task<SustainabilityCheckData> CalculateRenderedPageSize(string? url)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions() { Headless = true });

            var context = await browser.NewContextAsync();

            // Navigate to the web page
            var page = await browser.NewPageAsync();

            // Add our tracking script
            var script = await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Path = "./App_Plugins/Umbraco.Community.Sustainability/js/page-tracker.js",
                Type = "module"
            });

            var request = await page.RunAndWaitForRequestFinishedAsync(async () =>
            {
                var response = await page.GotoAsync(url);

                // Get the HTML content of the page
                string htmlContent = await page.ContentAsync();
            });

            return new SustainabilityCheckData() { };
        }
    }
}
