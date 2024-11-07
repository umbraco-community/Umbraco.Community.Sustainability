using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IMediaOptimisationService
    {
        bool ShowMediaWarning(int nodeId);
    }

    public class MediaOptimisationService : IMediaOptimisationService
    {
        private readonly IUmbracoContextFactory _umbracoContextFactory;
        private readonly SustainabilityConfiguration _configuration;

        public MediaOptimisationService(
            IUmbracoContextFactory umbracoContextFactory,
            IOptions<SustainabilityConfiguration> configuration)
        {
            _umbracoContextFactory = umbracoContextFactory;
            _configuration = configuration.Value;
        }

        public bool ShowMediaWarning(int nodeId)
        {
            var mediaItem = GetMediaFile(nodeId);
            if (mediaItem == null)
            {
                return false;
            }

            var fileTypes = _configuration.MediaOptimisation.FileTypes;
            if (!fileTypes.Any(x => x.Key.InvariantEquals(mediaItem.ContentType.Alias)))
            {
                return false;
            }

            var imageSize = mediaItem.Value<int>("umbracoBytes");
            var acceptedFileSize = fileTypes.FirstOrDefault(x => x.Key.InvariantEquals(mediaItem.ContentType.Alias));

            long maxAcceptedFileSize = (long)Convert.ToDouble(acceptedFileSize.Value);

            return imageSize > maxAcceptedFileSize;
        }

        private IPublishedContent? GetMediaFile(int nodeId)
        {
            using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();

            return umbracoContextReference.UmbracoContext.Media?.GetById(nodeId);
        }
    }
}
