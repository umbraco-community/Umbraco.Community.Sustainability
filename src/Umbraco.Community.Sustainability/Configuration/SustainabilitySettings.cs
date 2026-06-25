namespace Umbraco.Community.Sustainability.Configuration
{
    /// <summary>
    /// Configuration settings for the Sustainability package.
    /// Bound from appsettings.json at "Sustainability" section.
    /// </summary>
    public class SustainabilitySettings
    {
        /// <summary>
        /// Maximum number of concurrent sustainability checks during site-wide checks.
        /// Default: 2, Max: 5
        /// </summary>
        public int MaxConcurrentChecks { get; set; } = 2;

        /// <summary>
        /// Maximum duration for site-wide checks in minutes.
        /// Default: 60, Set to 0 for no limit.
        /// </summary>
        public int MaxCheckDurationMinutes { get; set; } = 60;

        /// <summary>
        /// Whether to use Umbraco's content index (Examine) for URL discovery.
        /// Default: true
        /// </summary>
        public bool UseUmbracoContentIndex { get; set; } = true;

        /// <summary>
        /// Whether to use sitemap.xml for URL discovery.
        /// Default: false
        /// </summary>
        public bool UseSitemapXml { get; set; } = false;

        /// <summary>
        /// Optional override for the sitemap URL.
        /// If not specified, defaults to /sitemap.xml
        /// </summary>
        public string? SitemapUrl { get; set; }
    }
}
