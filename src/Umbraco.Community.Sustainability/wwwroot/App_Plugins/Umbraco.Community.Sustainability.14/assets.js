const e = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-CEJzb1eL.js"),
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
}, n = [e], s = [
  {
    type: "globalContext",
    alias: "sustainability.context",
    name: "Sustainability context",
    js: () => import("./sustainability.context-Db2dXv8K.js")
  }
], o = [...s], i = "Umb.Section.Sustainability", t = "Umb.Menu.Sustainability", m = {
  type: "section",
  alias: i,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  }
}, c = {
  type: "menu",
  alias: t,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, l = [
  {
    type: "menuItem",
    alias: '"Sustainability.MenuItem.Overview',
    name: "Sustainability Overview Menu Item",
    weight: 200,
    meta: {
      label: "Overview",
      icon: "icon-eco",
      menus: [t],
      entityType: "overview-root"
    }
  },
  {
    type: "menuItem",
    alias: '"Sustainability.MenuItem.Stats',
    name: "Sustainability Stats Menu Item",
    weight: 100,
    meta: {
      label: "Stats",
      icon: "icon-chart",
      menus: [t],
      entityType: "stats-root"
    }
  }
], y = {
  type: "sectionSidebarApp",
  kind: "menuWithEntityActions",
  alias: "Umb.SidebarMenu.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: t,
    entity: "sustainability-root"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: i
    }
  ]
}, u = [
  m,
  c,
  ...l,
  y
], b = [
  {
    type: "workspace",
    alias: "Sustainability.Workspace.OverviewRoot",
    name: "Sustainability Overview Root Workspace",
    js: () => import("./overview-root-workspace.element-0Bekifeg.js"),
    meta: {
      entityType: "overview-root"
    }
  },
  {
    type: "workspace",
    alias: "Sustainability.Workspace.StatsRoot",
    name: "Sustainability Stats Root Workspace",
    js: () => import("./stats-root-workspace.element-DpmlLM66.js"),
    meta: {
      entityType: "stats-root"
    }
  }
], S = [
  ...b
], p = (r, a) => {
  a.registerMany([
    ...o,
    ...n,
    ...u,
    ...S
  ]);
};
export {
  p as onInit
};
//# sourceMappingURL=assets.js.map
