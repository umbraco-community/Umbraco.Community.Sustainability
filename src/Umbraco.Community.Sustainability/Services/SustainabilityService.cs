using System.Text.Json;
using Microsoft.Playwright;
using Umbraco.Community.Sustainability.Models;

namespace Umbraco.Community.Sustainability.Services
{
    public interface ISustainabilityService
    {
        Task<SustainabilityResponse> GetSustainabilityData(string url);
    }

    public class SustainabilityService : ISustainabilityService
    {
        public async Task<SustainabilityResponse> GetSustainabilityData(string url)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions() { Headless = true });

            var baseUri = new Uri(url);
            var page = await browser.NewPageAsync();

            var response = await page.GotoAsync(url, new PageGotoOptions()
            {
                WaitUntil = WaitUntilState.DOMContentLoaded
            });

            if (response == null || response?.Ok == false)
            {
                return new SustainabilityResponse();
            }

            var addedScript = await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Url = "/App_Plugins/UmbracoCommunitySustainability/js/resource-checker.js",
                Type = "module"
            });

            await page.Locator("[data-testid=\"sustainabilityData\"]").WaitForAsync(new LocatorWaitForOptions()
            {
                Timeout = 60000
            });
            var data = await page.GetByTestId("sustainabilityData").TextContentAsync();
            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityData>(data);

            var resourceGroups = new List<ExternalResourceGroup>();
            foreach (ResourceGroupType resourceGroupType in Enum.GetValues(typeof(ResourceGroupType)))
            {
                var resources = GetExternalResourceGroup(resourceGroupType, sustainabilityData.resources);
                resourceGroups.Add(resources);
            }

            await browser.CloseAsync();

            return new SustainabilityResponse()
            {
                TotalSize = sustainabilityData?.pageWeight.GetValueOrDefault() ?? 0,
                TotalEmissions = sustainabilityData?.emissions?.co2.GetValueOrDefault() ?? 0,
                CarbonRating = sustainabilityData?.carbonRating,
                ResourceGroups = resourceGroups
            };
        }

        private ExternalResourceGroup GetExternalResourceGroup(ResourceGroupType groupType, IList<Resource> resources)
        {
            var initiator = ExternalResourceGroup.GetInitiatorType(groupType);
            var resourcesByType = resources.Where(x => !string.IsNullOrEmpty(x.initiatorType) && x.initiatorType.Equals(initiator) && x.transferSize > 0);

            var transferSize = 0;
            var resourceList = new List<ExternalResource>();
            foreach (var resource in resourcesByType.OrderByDescending(x => x.transferSize))
            {
                transferSize += resource.transferSize.GetValueOrDefault();
                resourceList.Add(new ExternalResource(resource.name, resource.transferSize));
            }

            return new ExternalResourceGroup(groupType)
            {
                TotalSize = transferSize,
                Resources = resourceList
            };
        }
    }
}
