using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Notifications;

namespace Umbraco.Community.Sustainability.Composers
{
    public class PageMetricsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, PageMetricsNotificationHandler>();
        }
    }
}
