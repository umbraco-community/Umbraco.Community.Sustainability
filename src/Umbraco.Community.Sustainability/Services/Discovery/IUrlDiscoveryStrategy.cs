namespace Umbraco.Community.Sustainability.Services.Discovery
{
    /// <summary>
    /// Represents a strategy for discovering URLs to check during site-wide sustainability checks.
    /// </summary>
    public interface IUrlDiscoveryStrategy
    {
        /// <summary>
        /// The name of this discovery strategy.
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Priority for strategy execution. Higher values run first.
        /// Allows first strategy to "win" when duplicate URLs are discovered.
        /// </summary>
        int Priority { get; }

        /// <summary>
        /// Discover URLs from this strategy.
        /// </summary>
        /// <param name="baseUrl">The base URL of the site (e.g., https://example.com)</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Enumerable of discovered URLs</returns>
        Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken ct);
    }

    /// <summary>
    /// Represents a discovered URL with optional node context.
    /// </summary>
    /// <param name="Url">The absolute URL</param>
    /// <param name="NodeKey">The Umbraco node key, if known</param>
    /// <param name="NodeName">The Umbraco node name, if known</param>
    public record DiscoveredUrl(string Url, Guid? NodeKey = null, string? NodeName = null);
}
