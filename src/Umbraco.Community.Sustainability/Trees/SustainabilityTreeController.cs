using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Trees;
using Umbraco.Cms.Web.BackOffice.Trees;
using Umbraco.Cms.Web.Common.Attributes;

namespace Umbraco.Community.Sustainability.Trees
{
    [Tree("sustainability", "sustainability", TreeTitle = "Sustainability", TreeGroup = "sustainabilityTreeGroup")]
    [PluginController("UmbracoCommunitySustainability")]
    public class SustainabilityTreeController : TreeController
    {
        private readonly IMenuItemCollectionFactory _menuItemCollectionFactory;

        public SustainabilityTreeController(
            ILocalizedTextService localizedTextService,
            UmbracoApiControllerTypeCollection umbracoApiControllerTypeCollection,
            IEventAggregator eventAggregator,
            IMenuItemCollectionFactory menuItemCollectionFactory) : base(localizedTextService, umbracoApiControllerTypeCollection, eventAggregator)
        {
            _menuItemCollectionFactory = menuItemCollectionFactory;
        }

        protected override ActionResult<TreeNodeCollection> GetTreeNodes(string id, FormCollection queryStrings)
        {
            var collection = new TreeNodeCollection();

            if (id == Cms.Core.Constants.System.RootString)
            {
                var overviewNode = CreateTreeNode("overview", Cms.Core.Constants.System.RootString, queryStrings, "Overview", "icon-eco", false, "sustainability/sustainability/overview");
                overviewNode.MenuUrl = null;
                collection.Add(overviewNode);

                var statsNode = CreateTreeNode("stats", Cms.Core.Constants.System.RootString, queryStrings, "Stats", "icon-chart", false, "sustainability/sustainability/stats");
                statsNode.MenuUrl = null;
                collection.Add(statsNode);
            }

            return collection;
        }

        protected override ActionResult<MenuItemCollection> GetMenuForNode(string id, FormCollection queryStrings) =>
            //We don't have any menu item options (such as create/delete/reload) & only use the root node to load a custom UI
            _menuItemCollectionFactory.Create();

        protected override ActionResult<TreeNode?> CreateRootNode(FormCollection queryStrings)
        {
            ActionResult<TreeNode?> rootResult = base.CreateRootNode(queryStrings);

            if (!(rootResult.Result is null))
            {
                return rootResult;
            }

            TreeNode? root = rootResult.Value;

            if (root is not null)
            {
                root.RoutePath = "sustainability/sustainability/overview";
                root.Icon = "icon-eco";
                root.HasChildren = false;
                root.MenuUrl = null;
            }

            return root;
        }
    }
}
