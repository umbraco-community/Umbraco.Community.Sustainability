using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability.Notifications
{
    public class MediaTreeNodeRenderingNotificationHandler : INotificationHandler<TreeNodesRenderingNotification>
    {
        private readonly IMediaOptimisationService _mediaOptimisationService;
        private readonly SustainabilityConfiguration _configuration;

        public MediaTreeNodeRenderingNotificationHandler(
            IMediaOptimisationService mediaOptimisationService,
            IOptions<SustainabilityConfiguration> configuration)
        {
            _mediaOptimisationService = mediaOptimisationService;
            _configuration = configuration.Value;
        }

        public void Handle(TreeNodesRenderingNotification notification)
        {
            if (_configuration.Enabled
                && _configuration.MediaOptimisation.ShowWarnings
                && notification.TreeAlias == Cms.Core.Constants.Trees.Media)
            {
                foreach (var node in notification.Nodes)
                {
                    int.TryParse(node.Id.ToString(), out int nodeId);

                    if (_mediaOptimisationService.ShowMediaWarning(nodeId))
                    {
                        node.Icon = "icon-alert-alt color-red";
                    }
                }
            }
        }
    }
}
