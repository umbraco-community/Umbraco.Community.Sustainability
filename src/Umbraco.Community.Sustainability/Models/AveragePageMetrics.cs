namespace Umbraco.Community.Sustainability.Models
{
    public class AveragePageMetrics
    {
        public AveragePageMetrics() { }

        public string? CarbonRating { get; set; }
        public decimal? PageSize { get; set; }
        public decimal? Emissions { get; set; }
    }
}
