using Newtonsoft.Json;

namespace Umbraco.Community.Sustainability.Models
{
    public class ExternalResource
    {
        [JsonProperty("url")]
        public string? Url { get; set; }

        [JsonProperty("size")]
        public decimal Size { get; set; } = 0;

        public ExternalResource() { }

        public ExternalResource(string url, decimal size)
        {
            Url = url;
            Size = size;
        }
    }
}
