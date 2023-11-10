using System.ComponentModel.DataAnnotations;
using Umbraco.Community.Sustainability.Extensions;

namespace Umbraco.Community.Sustainability.Models
{

    public class ExternalResourceGroup
    {
        public ResourceGroupType Type { get; set; }
        public string? Name { get; set; }
        public decimal TotalSize { get; set; } = 0;
        public List<ExternalResource>? Resources { get; set; } = new List<ExternalResource>();

        public ExternalResourceGroup() { }
        public ExternalResourceGroup(ResourceGroupType type)
        {
            Type = type;
            Name = type.GetDisplayName();
        }
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
