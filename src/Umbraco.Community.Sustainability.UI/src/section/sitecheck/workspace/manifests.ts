import type { ManifestWorkspace } from "@umbraco-cms/backoffice/workspace";
import { SUSTAINABILITY_SITECHECK_ROOT_ENTITY_TYPE } from "../types.js";

const workspace: ManifestWorkspace = {
  type: "workspace",
  alias: "Sustainability.Workspace.SiteCheck",
  name: "Site Check Workspace",
  element: () => import("./sitecheck-workspace.element.js"),
  meta: {
    entityType: SUSTAINABILITY_SITECHECK_ROOT_ENTITY_TYPE,
  },
  //routes: [
  //  {
  //    path: "sitecheck",
  //    component: () => import("./sitecheck-workspace.element.js"),
  //  },
  //],
};

export const manifests = [workspace];
