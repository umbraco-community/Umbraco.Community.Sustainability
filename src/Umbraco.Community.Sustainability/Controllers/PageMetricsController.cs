using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class PageMetricsController : UmbracoApiController
    {
        private readonly IScopeProvider _scopeProvider;

        public PageMetricsController(IScopeProvider scopeProvider)
        {
            _scopeProvider = scopeProvider;
        }

        [HttpGet]
        public IEnumerable<PageMetric> GetPageMetrics(int pageId)
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = scope.Database.Fetch<PageMetric>($"SELECT * FROM {PageMetric.TableName} WHERE NodeId = @0", pageId);
            scope.Complete();

            return queryResults;
        }

        [HttpGet]
        public void TestData()
        {
            var rand = new Random();
            var pageMetric = new PageMetric()
            {
                NodeId = 1,
                RequestedBy = "Thomas",
                RequestDate = DateTime.Now,
                PageWeight = new decimal(rand.NextDouble()),
                PageData = "example data"
            };

            using var scope = _scopeProvider.CreateScope();
            scope.Database.Insert(pageMetric);
            scope.Complete();
        }

        [HttpPost]
        public void AddPageMetric(PageMetric pageMetric)
        {
            using var scope = _scopeProvider.CreateScope();
            scope.Database.Insert(pageMetric);
            scope.Complete();
        }
    }
}
