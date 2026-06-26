namespace Umbraco.Community.Sustainability.Models
{
    /// <summary>
    /// Data about sustainability test coverage across the site.
    /// </summary>
    public class PageCoverageData
    {
        /// <summary>
        /// Number of pages that have been tested for sustainability.
        /// </summary>
        public int TestedPageCount { get; set; }

        /// <summary>
        /// Number of tested pages whose metrics are older than the configured threshold.
        /// </summary>
        public int StalePageCount { get; set; }
    }
}
