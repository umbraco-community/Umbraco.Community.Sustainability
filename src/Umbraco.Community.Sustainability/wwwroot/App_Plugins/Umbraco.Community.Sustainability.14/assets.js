const a = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-yMmJtA5O.js"),
  weight: 10,
  meta: {
    icon: "icon-eco",
    pathname: "sustainability",
    label: "Sustainability"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "Umb.Workspace.Document"
    }
  ]
}, t = [a], s = (o, i) => {
  i.registerMany([
    ...t
  ]);
};
export {
  s as onInit
};
//# sourceMappingURL=assets.js.map
