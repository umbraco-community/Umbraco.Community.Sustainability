using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IPageMetricService
    {
        public Task<IEnumerable<PageMetric>> GetOverviewMetrics();
        public Task<AveragePageMetrics> GetAverageMetrics();
        public Task<IEnumerable<PageMetric>> GetPageMetrics(Guid pageKey);
        public Task AddPageMetric(PageMetric pageMetric);
        public Task<PageCoverageData> GetPageCoverageData(int staleDays);
    }

    public class PageMetricService : IPageMetricService
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly IPublishedContentQuery _contentQuery;

        public PageMetricService(
            IScopeProvider scopeProvider,
            IPublishedContentQuery contentQuery)
        {
            _scopeProvider = scopeProvider;
            _contentQuery = contentQuery;
        }

        public async Task<IEnumerable<PageMetric>> GetOverviewMetrics()
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = await scope.Database.FetchAsync<PageMetric>();

            queryResults = queryResults.OrderByDescending(x => x.RequestDate).ToList();
            queryResults = queryResults.DistinctBy(x => x.NodeKey).ToList();

            foreach (var result in queryResults)
            {
                if (result.NodeKey != null)
                {
                    var node = _contentQuery.Content(result.NodeKey);
                    result.NodeName = node?.Name;
                }
            }

            scope.Complete();

            return queryResults;
        }

        public async Task<AveragePageMetrics> GetAverageMetrics()
        {
            var overviewMetrics = await GetOverviewMetrics();

            if (overviewMetrics.Any())
            {
                return new AveragePageMetrics()
                {
                    PageSize = overviewMetrics.Sum(x => x.TotalSize) / overviewMetrics.Count(),
                    Emissions = overviewMetrics.Sum(x => x.TotalEmissions) / overviewMetrics.Count(),
                };
            }

            return new();
        }

        public async Task<IEnumerable<PageMetric>> GetPageMetrics(Guid pageKey)
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = await scope.Database.FetchAsync<PageMetric>("WHERE NodeKey = @0", args: [pageKey]);
            scope.Complete();

            return queryResults;
        }

        public async Task AddPageMetric(PageMetric pageMetric)
        {
            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertAsync(pageMetric);
            scope.Complete();
        }

        public async Task<PageCoverageData> GetPageCoverageData(int staleDays)
        {
            using var scope = _scopeProvider.CreateScope();
            var staleDate = DateTime.UtcNow.AddDays(-staleDays);

            // Count distinct tested pages
            var testedCountSql = scope.SqlContext.Sql()
                .Select("COUNT(DISTINCT NodeKey)")
                .From("umbPageMetrics");
            var testedCount = await scope.Database.ExecuteScalarAsync<int>(testedCountSql);

            // Count pages with stale metrics (all metrics older than threshold)
            var staleCountSql = scope.SqlContext.Sql(@"
                SELECT COUNT(*)
                FROM (
                    SELECT NodeKey
                    FROM umbPageMetrics
                    GROUP BY NodeKey
                    HAVING MAX(RequestDate) < @0
                ) AS StalePages", staleDate);
            var staleCount = await scope.Database.ExecuteScalarAsync<int>(staleCountSql);

            scope.Complete();

            return new PageCoverageData
            {
                TestedPageCount = testedCount,
                StalePageCount = staleCount
            };
        }
    }
}
