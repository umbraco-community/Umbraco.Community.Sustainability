import type { ManifestWorkspace, ManifestWorkspaceContext } from "@umbraco-cms/backoffice/extension-registry";
import { SUSTAINABILITY_OVERVIEW_ROOT_ENTITY_TYPE } from "../types";

const workspaceAlias = "Sustainability.Workspace.Overview";
const contextAlias = "Sustainability.Workspace.Context";

const workspace: ManifestWorkspace = {
  type: "workspace",
  alias: workspaceAlias,
  name: "Overview Root Workspace",
  js: () => import('./overview-workspace.element'),
  meta: {
    entityType: SUSTAINABILITY_OVERVIEW_ROOT_ENTITY_TYPE
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
