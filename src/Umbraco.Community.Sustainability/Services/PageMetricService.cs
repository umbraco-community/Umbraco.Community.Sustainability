using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IPageMetricService
    {
        Task<IEnumerable<PageMetric>> GetPageMetrics(int pageId);
        Task AddPageMetric(PageMetric pageMetric);
    }

    public class PageMetricService : IPageMetricService
    {
        private readonly IScopeProvider _scopeProvider;

        public PageMetricService(IScopeProvider scopeProvider)
        {
            _scopeProvider = scopeProvider;
        }

        public async Task<IEnumerable<PageMetric>> GetPageMetrics(int pageId)
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = await scope.Database.FetchAsync<PageMetric>($"SELECT * FROM {PageMetric.TableName} WHERE NodeId = @0", pageId);
            scope.Complete();

            return queryResults;
        }

        public async Task AddPageMetric(PageMetric pageMetric)
        {
            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertAsync(pageMetric);
            scope.Complete();
        }
    }
}
