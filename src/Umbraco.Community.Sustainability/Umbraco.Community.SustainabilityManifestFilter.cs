using Umbraco.Cms.Core.Manifest;

namespace Umbraco.Community.Umbraco.Community.Sustainability
{
    internal class Umbraco.Community.SustainabilityManifestFilter : IManifestFilter
    {
        public void Filter(List<PackageManifest> manifests)
        {
            var assembly = typeof(Umbraco.Community.SustainabilityManifestFilter).Assembly;

            manifests.Add(new PackageManifest
            {
                PackageName = "Umbraco.Community.Sustainability",
                Version = assembly.GetName()?.Version?.ToString(3) ?? "0.1.0",
                AllowPackageTelemetry = true,
                Scripts = new string[] {
                    // List any Script files
                    // Urls should start '/App_Plugins/Umbraco.Community.Sustainability/' not '/wwwroot/Umbraco.Community.Sustainability/', e.g.
                    // "/App_Plugins/Umbraco.Community.Sustainability/Scripts/scripts.js"
                },
                Stylesheets = new string[]
                {
                    // List any Stylesheet files
                    // Urls should start '/App_Plugins/Umbraco.Community.Sustainability/' not '/wwwroot/Umbraco.Community.Sustainability/', e.g.
                    // "/App_Plugins/Umbraco.Community.Sustainability/Styles/styles.css"
                }
            });
        }
    }
}
