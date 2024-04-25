import { ManifestWorkspace } from "@umbraco-cms/backoffice/extension-registry";

const workspace: ManifestWorkspace[] = [
  {
    type: "workspace",
    alias: "Sustainability.Workspace.OverviewRoot",
    name: "Sustainability Overview Root Workspace",
    js: () => import("./views/overview-root-workspace.element"),
    meta: {
      entityType: "overview-root",
    }
  },
  {
    type: "workspace",
    alias: "Sustainability.Workspace.StatsRoot",
    name: "Sustainability Stats Root Workspace",
    js: () => import("./views/stats-root-workspace.element"),
    meta: {
      entityType: "stats-root",
    },
  },
]

export const manifests = [
  ...workspace
];
