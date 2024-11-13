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
        public Variables? variables { get; set; }
    }

    public record Variables
    {
        public string? description { get; set; }
        public int? bytes { get; set; }
        public GridIntensity? gridIntensity { get; set; }
        public double? dataReloadRatio { get; set; }
        public double? firstVisitPercentage { get; set; }
        public double? returnVisitPercentage { get; set; }
    }

    public record GridIntensity
    {
        public string? description { get; set; }
        public double? network { get; set; }
        public double? dataCenter { get; set; }
        public double? production { get; set; }
        public double? device { get; set; }
    }

    public record Resource
    {
        public string? name { get; set; }
        public string? entryType { get; set; }
        public double? startTime { get; set; }
        public double? duration { get; set; }
        public string? initiatorType { get; set; }
        public string? deliveryType { get; set; }
        public string? nextHopProtocol { get; set; }
        public string? renderBlockingStatus { get; set; }
        public double? workerStart { get; set; }
        public double? redirectStart { get; set; }
        public double? redirectEnd { get; set; }
        public double? fetchStart { get; set; }
        public double? domainLookupStart { get; set; }
        public double? domainLookupEnd { get; set; }
        public double? connectStart { get; set; }
        public double? secureConnectionStart { get; set; }
        public double? connectEnd { get; set; }
        public double? requestStart { get; set; }
        public double? responseStart { get; set; }
        public double? firstInterimResponseStart { get; set; }
        public double? responseEnd { get; set; }
        public int? transferSize { get; set; }
        public int? encodedBodySize { get; set; }
        public int? decodedBodySize { get; set; }
        public int? responseStatus { get; set; }
        public object[] serverTiming { get; set; }
    }
}
