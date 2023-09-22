using System.ComponentModel.DataAnnotations;

namespace Umbraco.Community.Sustainability.Models
{
    public class ExternalResourceGroup
    {
        public ResourceGroupType Type { get; set; }
        public string? Name { get; set; }
        public long? TotalSize { get; set; } = 0;
        public List<ExternalResource>? Resources { get; set; } = new List<ExternalResource>();
    }

    public enum ResourceGroupType
    {
        [Display(Name = "Images")]
        Images,
        [Display(Name = "Scripts")]
        Scripts,
        [Display(Name = "Stylesheets")]
        Stylesheets
    }
}
