using System.Text.Json.Serialization;

namespace Umbraco.Community.Sustainability.Models
{
    /// <summary>
    /// Represents progress or result of a site-wide sustainability check.
    /// Sent as SSE (Server-Sent Events) during site check execution.
    /// </summary>
    public class SiteCheckProgressDto
    {
        /// <summary>
        /// Event type: "discovery", "result", "error", or "complete"
        /// </summary>
        [JsonPropertyName("type")]
        public required string Type { get; set; }

        /// <summary>
        /// The URL being checked or about to be checked.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// The Umbraco node key, if known.
        /// </summary>
        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        /// <summary>
        /// The Umbraco node name, if known.
        /// </summary>
        [JsonPropertyName("nodeName")]
        public string? NodeName { get; set; }

        /// <summary>
        /// Whether the check succeeded.
        /// </summary>
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        /// <summary>
        /// Carbon rating (A+, A, B, C, D, E, F) for successful checks.
        /// </summary>
        [JsonPropertyName("carbonRating")]
        public string? CarbonRating { get; set; }

        /// <summary>
        /// Total page size in bytes.
        /// </summary>
        [JsonPropertyName("totalSize")]
        public decimal TotalSize { get; set; }

        /// <summary>
        /// Total CO2 emissions in grams.
        /// </summary>
        [JsonPropertyName("totalEmissions")]
        public decimal TotalEmissions { get; set; }

        /// <summary>
        /// Error message if the check failed.
        /// </summary>
        [JsonPropertyName("error")]
        public string? Error { get; set; }

        /// <summary>
        /// Total number of pages to check (set during discovery phase).
        /// </summary>
        [JsonPropertyName("totalPages")]
        public int TotalPages { get; set; }

        /// <summary>
        /// Number of pages completed so far.
        /// </summary>
        [JsonPropertyName("pagesCompleted")]
        public int PagesCompleted { get; set; }
    }
}
