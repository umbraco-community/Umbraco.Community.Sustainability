using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.Sustainability.ContentApps;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.ManifestFilters().Append<SustainabilityManifestFilter>();
            builder.ContentApps().Append<SustainabilityContentApp>();
        }
    }
}
