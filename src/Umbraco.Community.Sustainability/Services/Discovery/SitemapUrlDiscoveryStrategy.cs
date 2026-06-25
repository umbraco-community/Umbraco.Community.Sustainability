using System.Xml.Linq;

namespace Umbraco.Community.Sustainability.Services.Discovery
{
    /// <summary>
    /// Discovers URLs by fetching and parsing sitemap.xml.
    /// Provides only URLs (no NodeKey — can be correlated later if needed).
    /// Priority: 50 (runs second, fills gaps not covered by Examine strategy)
    /// </summary>
    public class SitemapUrlDiscoveryStrategy : IUrlDiscoveryStrategy
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public string Name => "Sitemap XML";
        public int Priority => 50;

        public SitemapUrlDiscoveryStrategy(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken ct)
        {
            var urls = new List<DiscoveredUrl>();

            try
            {
                var client = _httpClientFactory.CreateClient("SustainabilitySitemap");
                var sitemapUrl = $"{baseUrl.TrimEnd('/')}/sitemap.xml";

                var response = await client.GetAsync(sitemapUrl, ct);
                if (!response.IsSuccessStatusCode)
                {
                    return urls;
                }

                var content = await response.Content.ReadAsStringAsync(ct);
                var doc = XDocument.Parse(content);

                // Handle sitemap index
                var sitemapElements = doc.Root?.Elements()
                    .Where(e => e.Name.LocalName == "sitemap")
                    .ToList();

                if (sitemapElements?.Any() == true)
                {
                    // This is a sitemap index, fetch each sitemap
                    foreach (var sitemap in sitemapElements)
                    {
                        var locElement = sitemap.Elements()
                            .FirstOrDefault(e => e.Name.LocalName == "loc");

                        if (locElement != null)
                        {
                            var sitemapUrl2 = locElement.Value;
                            await FetchAndParseUrlsAsync(client, sitemapUrl2, urls, ct);
                        }
                    }
                }
                else
                {
                    // This is a regular sitemap, parse URLs directly
                    var urlElements = doc.Root?.Elements()
                        .Where(e => e.Name.LocalName == "url")
                        .ToList();

                    if (urlElements?.Any() == true)
                    {
                        foreach (var urlElement in urlElements)
                        {
                            var locElement = urlElement.Elements()
                                .FirstOrDefault(e => e.Name.LocalName == "loc");

                            if (locElement != null && !string.IsNullOrWhiteSpace(locElement.Value))
                            {
                                urls.Add(new DiscoveredUrl(locElement.Value));
                            }
                        }
                    }
                }
            }
            catch
            {
                // Silently fail — sitemap may not exist or be malformed
                return urls;
            }

            return await Task.FromResult(urls);
        }

        private async Task FetchAndParseUrlsAsync(
            HttpClient client,
            string sitemapUrl,
            List<DiscoveredUrl> urls,
            CancellationToken ct)
        {
            try
            {
                var response = await client.GetAsync(sitemapUrl, ct);
                if (!response.IsSuccessStatusCode)
                {
                    return;
                }

                var content = await response.Content.ReadAsStringAsync(ct);
                var doc = XDocument.Parse(content);

                var urlElements = doc.Root?.Elements()
                    .Where(e => e.Name.LocalName == "url")
                    .ToList();

                if (urlElements?.Any() == true)
                {
                    foreach (var urlElement in urlElements)
                    {
                        var locElement = urlElement.Elements()
                            .FirstOrDefault(e => e.Name.LocalName == "loc");

                        if (locElement != null && !string.IsNullOrWhiteSpace(locElement.Value))
                        {
                            urls.Add(new DiscoveredUrl(locElement.Value));
                        }
                    }
                }
            }
            catch
            {
                // Silently fail
            }
        }
    }
}
