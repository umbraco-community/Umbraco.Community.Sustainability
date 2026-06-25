using Examine;
using Umbraco.Cms.Core.Routing;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Services.Discovery
{
    /// <summary>
    /// Discovers URLs by querying Umbraco's Examine content index for published nodes.
    /// Provides both URL and NodeKey, allowing content correlation with metrics.
    /// Priority: 100 (runs first, wins on duplicate URLs)
    /// </summary>
    public class UmbracoContentUrlDiscoveryStrategy : IUrlDiscoveryStrategy
    {
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _publishedUrlProvider;

        public string Name => "Umbraco Content Index";
        public int Priority => 100;

        public UmbracoContentUrlDiscoveryStrategy(
            IExamineManager examineManager,
            IPublishedUrlProvider publishedUrlProvider)
        {
            _examineManager = examineManager;
            _publishedUrlProvider = publishedUrlProvider;
        }

        public async Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken ct)
        {
            var urls = new List<DiscoveredUrl>();

            if (!_examineManager.TryGetIndex(Cms.Core.Constants.UmbracoIndexes.ExternalIndexName, out var index))
            {
                return urls;
            }

            var searcher = index.Searcher;
            var results = searcher.CreateQuery()
                .Field("__Published", "y")
                .Execute();

            foreach (var result in results.ToList())
            {
                if (!Guid.TryParse(result.Values["__Key"], out var nodeKey))
                {
                    continue;
                }

                // Try to get the URL from the published URL provider
                var url = _publishedUrlProvider.GetUrl(nodeKey);
                if (string.IsNullOrWhiteSpace(url))
                {
                    continue;
                }

                // Convert relative URL to absolute
                if (url.StartsWith("/"))
                {
                    url = baseUrl.TrimEnd('/') + url;
                }

                var nodeName = result.Values.TryGetValue("nodeName", out var name) ? name : null;

                urls.Add(new DiscoveredUrl(url, nodeKey, nodeName));

                // Respect cancellation
                if (ct.IsCancellationRequested)
                {
                    break;
                }
            }

            return await Task.FromResult(urls);
        }
    }
}
