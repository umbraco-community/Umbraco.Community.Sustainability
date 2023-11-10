using Newtonsoft.Json;

namespace Umbraco.Community.Sustainability.Models
{
    public class PageDataModel
    {
        [JsonProperty("PageCarbon")]
        public decimal PageCarbon { get; set; }

        [JsonProperty("PageWeight")]
        public decimal PageWeight { get; set; }

        [JsonProperty("images")]
        public List<PageDataResourceModel>? Images { get; set; }

        [JsonProperty("scripts")]
        public List<PageDataResourceModel>? Scripts { get; set; }

        [JsonProperty("stylesheets")]
        public List<PageDataResourceModel>? Stylesheets { get; set; }
    }

    public class PageDataResourceModel
    {
        public string? Name { get; set; }
        public long? TransferSize { get; set; }
        public string? Type { get; set; }
    }
}
