using Umbraco.Cms.Core.Sections;

namespace Umbraco.Community.Sustainability.Sections
{
    public class SustainabilitySection : ISection
    {
        public string Alias => Constants.SectionAlias;
        public string Name => Constants.Name;
    }
}
