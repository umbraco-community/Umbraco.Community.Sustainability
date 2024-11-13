import type { ManifestWorkspace } from "@umbraco-cms/backoffice/extension-registry";
import { SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE } from "../types";

const workspaceAlias = "Sustainability.Workspace.Stats";

const workspace: ManifestWorkspace = {
  type: "workspace",
  alias: workspaceAlias,
  name: "Stats Root Workspace",
  js: () => import('./stats-workspace.element'),
  meta: {
    entityType: SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE
  },
};

export const manifests = [
  workspace
];
