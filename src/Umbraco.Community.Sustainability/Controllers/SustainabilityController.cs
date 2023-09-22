using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Community.Sustainability.Extensions;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class SustainabilityController : SurfaceController
    {
        public SustainabilityController(IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
        }

        [HttpGet]
        public async Task<IActionResult> CheckPage([FromQuery] int pageId)
        {
            IPublishedContent? contentItem = UmbracoContext?.Content?.GetById(pageId);
            string? url = contentItem?.Url(mode: UrlMode.Absolute);

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    string htmlContent = await httpClient.GetStringAsync(url);

                    // Parse the HTML content using HtmlAgilityPack.
                    HtmlDocument htmlDoc = new HtmlDocument();
                    htmlDoc.LoadHtml(htmlContent);

                    // Calculate the size of the parsed HTML content.
                    return Ok(await CalculateRenderedPageSize(htmlDoc));
                }
                catch (HttpRequestException ex)
                {
                    return Ok(null);
                }
            }
        }

        private async Task<SustainabilityCheckData> CalculateRenderedPageSize(HtmlDocument htmlDoc)
        {
            long? pageSize = 0;

            // Calculate the size of the HTML content.
            string htmlContent = htmlDoc.Text;
            pageSize += htmlContent.Length;

            // Calculate the size of external resources (images, stylesheets, scripts, etc.).
            var resources = await GetExternalResourceUrls(htmlDoc);
            pageSize += resources.Sum(x => x.TotalSize);

            return new SustainabilityCheckData()
            {
                TotalSize = pageSize,
                ResourceGroups = resources
            };
        }

        private async Task<List<ExternalResourceGroup>> GetExternalResourceUrls(HtmlDocument htmlDoc)
        {
            List<ExternalResourceGroup> resources = new List<ExternalResourceGroup>();

            // Parse <img> tags and get their 'src' attributes.
            var imgTags = htmlDoc.DocumentNode.SelectNodes("//img[@src]");
            if (imgTags != null)
            {
                var resourceGroup = new ExternalResourceGroup() { Type = ResourceGroupType.Images, Name = ResourceGroupType.Images.GetDisplayName() };

                foreach (var imgTag in imgTags)
                {
                    string src = imgTag.Attributes["src"].Value;
                    resourceGroup.Resources?.Add(new ExternalResource()
                    {
                        Url = src,
                        Size = await GetResourceSize(src)
                    });
                }

                resourceGroup.TotalSize = resourceGroup.Resources?.Sum(x => x.Size);
                resources.Add(resourceGroup);
            }

            // Parse <link> tags (stylesheets) and get their 'href' attributes.
            var linkTags = htmlDoc.DocumentNode.SelectNodes("//link[@href]");
            if (linkTags != null)
            {
                var resourceGroup = new ExternalResourceGroup() { Type = ResourceGroupType.Stylesheets, Name = ResourceGroupType.Stylesheets.GetDisplayName() };

                foreach (var linkTag in linkTags)
                {
                    string src = linkTag.Attributes["href"].Value;
                    resourceGroup.Resources?.Add(new ExternalResource()
                    {
                        Url = src,
                        Size = await GetResourceSize(src)
                    });
                }

                resourceGroup.TotalSize = resourceGroup.Resources?.Sum(x => x.Size);
                resources.Add(resourceGroup);
            }

            // Parse <script> tags and get their 'src' attributes.
            var scriptTags = htmlDoc.DocumentNode.SelectNodes("//script[@src]");
            if (scriptTags != null)
            {
                var resourceGroup = new ExternalResourceGroup() { Type = ResourceGroupType.Scripts, Name = ResourceGroupType.Scripts.GetDisplayName() };

                foreach (var scriptTag in scriptTags)
                {
                    string src = scriptTag.Attributes["src"].Value;
                    resourceGroup.Resources?.Add(new ExternalResource()
                    {
                        Url = src,
                        Size = await GetResourceSize(src)
                    });
                }

                resourceGroup.TotalSize = resourceGroup.Resources?.Sum(x => x.Size);
                resources.Add(resourceGroup);
            }

            return resources;
        }

        private async Task<long> GetResourceSize(string resourceUrl)
        {
            long pageSize = 0;
            try
            {
                using (HttpClient resourceClient = new HttpClient())
                {
                    byte[] resourceData = await resourceClient.GetByteArrayAsync(resourceUrl);
                    pageSize = resourceData.Length;
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error fetching resource '{resourceUrl}': {ex.Message}");
            }

            return pageSize;
        }
    }
}
