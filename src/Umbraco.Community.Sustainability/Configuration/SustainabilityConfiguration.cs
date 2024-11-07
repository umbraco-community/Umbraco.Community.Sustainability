namespace Umbraco.Community.Sustainability.Configuration
{
    public class SustainabilityConfiguration
    {
        public const string SectionAlias = "UmbracoCommunitySustainability";

        public bool Enabled { get; set; } = true;
        public MediaOptimisationConfiguration MediaOptimisation { get; set; }
    }
}
