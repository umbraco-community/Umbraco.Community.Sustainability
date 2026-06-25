using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability.Controllers
{
    /// <summary>
    /// Controller for site-wide sustainability check operations.
    /// Provides SSE endpoint for real-time progress updates.
    /// </summary>
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Sustainability")]
    public class SiteCheckController : SustainabilityWorkspaceControllerBase
    {
        private readonly ISiteCheckService _siteCheckService;

        public SiteCheckController(ISiteCheckService siteCheckService)
            => _siteCheckService = siteCheckService;

        /// <summary>
        /// Start a site-wide sustainability check.
        /// Returns Server-Sent Events stream with progress updates.
        /// </summary>
        [HttpGet("startSiteCheck")]
        [Produces("text/event-stream")]
        [ProducesResponseType(typeof(SiteCheckProgressDto), 200)]
        public async Task<ServerSentEventsResult<SiteCheckProgressDto>> StartSiteCheck(CancellationToken ct)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var applicationUrl = baseUrl;

            return TypedResults.ServerSentEvents(
                _siteCheckService.StartSiteCheckAsync(baseUrl, applicationUrl, ct),
                "sitecheck");
        }

        /// <summary>
        /// Check if a site check is currently running.
        /// </summary>
        [HttpGet("isSiteCheckRunning")]
        [ProducesResponseType(typeof(bool), 200)]
        public IActionResult IsSiteCheckRunning()
            => Ok(_siteCheckService.IsRunning);
    }
}
