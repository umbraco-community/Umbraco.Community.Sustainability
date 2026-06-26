namespace Umbraco.Community.Sustainability.Models
{
    /// <summary>
    /// Configuration settings for sustainability health checks.
    /// </summary>
    public class SustainabilityHealthCheckSettings
    {
        /// <summary>
        /// Number of days after which page metrics are considered stale.
        /// Default: 30 days.
        /// </summary>
        public int StaleDays { get; set; } = 30;
    }
}
