import type { ManifestWorkspace, ManifestWorkspaceContext, ManifestWorkspaceView } from "@umbraco-cms/backoffice/extension-registry";
import { SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE } from "../types";

const workspaceAlias = "Sustainability.Workspace.Stats";
const contextAlias = "Sustainability.Workspace.Context";

const workspace: ManifestWorkspace = {
  type: "workspace",
  alias: workspaceAlias,
  name: "Stats Root Workspace",
  js: () => import('./stats-workspace.element'),
  meta: {
    entityType: SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE
  },
};

const context: ManifestWorkspaceContext = {
  type: 'workspaceContext',
  alias: contextAlias,
  name: 'Stats Workspace Context',
  js: () => import('../../../context/sustainability.context'),
};

export const manifests = [
  context,
  workspace
];
