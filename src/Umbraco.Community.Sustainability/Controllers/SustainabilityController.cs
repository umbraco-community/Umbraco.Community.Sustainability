using System.Text.Json;
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
            if (contentItem == null)
            {
                return Ok("Page not found");
            }

            string url = contentItem.Url(mode: UrlMode.Absolute);
            return Ok(await CalculateRenderedPageSize(url));
        }

        [HttpPost]
        public IActionResult SavePageData([FromBody] PageDataModel model)
        {
            var data = model;
            return Ok(true);
        }

        private async Task<SustainabilityCheckData> CalculateRenderedPageSize(string url)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions() { Headless = true });

            // Create a new incognito browser context
            // Navigate to the web page
            var context = await browser.NewContextAsync();
            var page = await context.NewPageAsync();
            await page.GotoAsync(url);

            // Add our script to report data
            await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Path = "./App_Plugins/Umbraco.Community.Sustainability/js/page-tracker.js",
                Type = "module"
            });

            // Retrieve data from page
            var data = await page.GetByTestId("sustainabilityData").TextContentAsync();
            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityData>(data);

            var resourceGroups = new List<ExternalResourceGroup>();

            var scripts = GetExternalResourceGroup(ResourceGroupType.Scripts, sustainabilityData.resources);
            resourceGroups.Add(scripts);

            var images = GetExternalResourceGroup(ResourceGroupType.Images, sustainabilityData.resources);
            resourceGroups.Add(images);

            var stylesheets = GetExternalResourceGroup(ResourceGroupType.Stylesheets, sustainabilityData.resources);
            resourceGroups.Add(stylesheets);

            await browser.CloseAsync();

            return new SustainabilityCheckData()
            {
                TotalSize = sustainabilityData.pageWeight,
                TotalEmissions = sustainabilityData.emissions.co2,
                ResourceGroups = resourceGroups
            };
        }

        private ExternalResourceGroup GetExternalResourceGroup(ResourceGroupType groupType, IList<Resource> resources)
        {
            var initiator = GetInitiatorType(groupType);
            var resourcesByType = resources.Where(x => x.initiatorType.Equals(initiator));

            var transferSize = 0;
            var resourceList = new List<ExternalResource>();
            foreach (var resource in resourcesByType)
            {
                transferSize += resource.transferSize;
                resourceList.Add(new ExternalResource(resource.name, resource.transferSize));
            }
            
            return new ExternalResourceGroup(groupType)
            {
                TotalSize = transferSize,
                Resources = resourceList
            };
        }

        private string GetInitiatorType(ResourceGroupType groupType)
        {
            switch (groupType)
            {
                case ResourceGroupType.Images:
                    return "img";

                case ResourceGroupType.Scripts:
                    return "script";

                case ResourceGroupType.Stylesheets:
                    return "css";

                default:
                    return string.Empty;
            }
        }

        private async Task<int> GetTransferSize(IPage page)
        {
            var bytesSent = await page.EvaluateAsync<int>(@"() => {
                const resources = window.performance.getEntriesByType('resource');
                let bytesSent = 0;
                resources.forEach((entry) => {
                    if (entry.initiatorType === 'script') {
                        bytesSent += entry.transferSize;
                    }
                });
                return bytesSent;
            }");

            return bytesSent;
        }
    }
}
