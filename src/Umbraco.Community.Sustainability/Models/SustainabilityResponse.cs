using Newtonsoft.Json;

namespace Umbraco.Community.Sustainability.Models
{
    public class SustainabilityResponse
    {
        [JsonProperty("lastRunDate")]
        public DateTime LastRunDate { get; set; } = DateTime.UtcNow;

        [JsonProperty("totalSize")]
        public decimal TotalSize { get; set; } = 0;

        [JsonProperty("totalEmissions")]
        public float TotalEmissions { get; set; } = 0;

        [JsonProperty("carbonRating")]
        public string? CarbonRating { get; set; }

        [JsonProperty("resourceGroups")]
        public List<ExternalResourceGroup>? ResourceGroups { get; set; }
    }
}
