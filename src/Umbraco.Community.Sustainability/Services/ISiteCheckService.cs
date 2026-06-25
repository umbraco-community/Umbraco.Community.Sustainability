using Umbraco.Community.Sustainability.Models;

namespace Umbraco.Community.Sustainability.Services
{
    /// <summary>
    /// Service for orchestrating site-wide sustainability checks.
    /// </summary>
    public interface ISiteCheckService
    {
        /// <summary>
        /// Start a site-wide sustainability check.
        /// </summary>
        /// <param name="baseUrl">The base URL of the site (e.g., https://example.com)</param>
        /// <param name="applicationUrl">The application URL for internal requests</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Async enumerable of progress/result events</returns>
        IAsyncEnumerable<SiteCheckProgressDto> StartSiteCheckAsync(
            string baseUrl,
            string applicationUrl,
            CancellationToken ct);

        /// <summary>
        /// Whether a site check is currently running.
        /// </summary>
        bool IsRunning { get; }
    }
}
