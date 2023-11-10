namespace Umbraco.Community.Sustainability.Models
{
    public class SustainabilityCheckData
    {
        public decimal TotalSize { get; set; } = 0;
        public List<ExternalResourceGroup>? ResourceGroups { get; set; }
    }
}
