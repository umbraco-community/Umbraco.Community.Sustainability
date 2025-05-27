using System.Text.Json;
using Microsoft.Playwright;
using Umbraco.Community.Sustainability.Models;

namespace Umbraco.Community.Sustainability.Services
{
    public interface ISustainabilityService
    {
        Task<SustainabilityResponse> GetSustainabilityData(string url, string applicationUrl = "");
    }

    public class SustainabilityService : ISustainabilityService
    {
        public async Task<SustainabilityResponse> GetSustainabilityData(string url, string applicationUrl = "")
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions()
            {
                Headless = false,
                Args = new[] { "--disable-web-security" }
            });

            var baseUri = new Uri(url);
            var context = await browser.NewContextAsync(new()
            {
                BypassCSP = true,
                IgnoreHTTPSErrors = true,
            });

            var page = await context.NewPageAsync();

            var response = await page.GotoAsync(url, new PageGotoOptions()
            {
                WaitUntil = WaitUntilState.DOMContentLoaded
            });

            if (response == null || response?.Ok == false)
            {
                return new SustainabilityResponse();
            }

            try
            {
                string scriptUrl = string.Concat(applicationUrl, "App_Plugins/Umbraco.Community.Sustainability/resource-checker.js");

                await page.EvaluateAsync($@"() => {{  
                    import('{scriptUrl}')  
                        .then(m => m.reportEmissions?.())  
                        .catch(e => console.error('reportEmissions failed', e));  
                }}");

                var locator = page.Locator("[data-testid='sustainabilityData']");
                await locator.WaitForAsync(new() { Timeout = 60000, State = WaitForSelectorState.Visible });

                var dataJson = await locator.TextContentAsync();

                if (string.IsNullOrWhiteSpace(dataJson))
                    return new SustainabilityResponse();

                var sustainabilityData = JsonSerializer.Deserialize<SustainabilityData>(dataJson);
                if (sustainabilityData?.resources == null)
                    return new SustainabilityResponse();

                var resourceGroups = new List<ExternalResourceGroup>();
                foreach (ResourceGroupType resourceGroupType in Enum.GetValues(typeof(ResourceGroupType)))
                {
                    var resources = GetExternalResourceGroup(resourceGroupType, sustainabilityData.resources);
                    resourceGroups.Add(resources);
                }

                return new SustainabilityResponse()
                {
                    TotalSize = sustainabilityData?.pageWeight.GetValueOrDefault() ?? 0,
                    TotalEmissions = sustainabilityData?.emissions?.co2.GetValueOrDefault() ?? 0,
                    CarbonRating = sustainabilityData?.carbonRating,
                    ResourceGroups = resourceGroups
                };
            }
            catch (Exception ex)
            {
                _ = ex;
                return new SustainabilityResponse();
            }
            finally
            {
                await page.CloseAsync();
                await browser.CloseAsync();
            }

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
