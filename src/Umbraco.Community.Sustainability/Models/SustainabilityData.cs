namespace Umbraco.Community.Sustainability.Models
{
    public record SustainabilityData
    {
        public int? pageWeight { get; set; }
        public string? carbonRating { get; set; }
        public Emissions? emissions { get; set; }
        public Resource[]? resources { get; set; }
    }

    public record Emissions
    {
        public double? co2 { get; set; }
        public bool green { get; set; }
    }

    public record Resource
    {
        public string? name { get; set; }
        public string? initiatorType { get; set; }
        public int? transferSize { get; set; }
    }
}
