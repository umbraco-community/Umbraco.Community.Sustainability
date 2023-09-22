using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Umbraco.Community.Umbraco.Community.Sustainability
{
    internal class Umbraco.Community.SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.ManifestFilters().Append<Umbraco.Community.SustainabilityManifestFilter>();
        }
    }
}
