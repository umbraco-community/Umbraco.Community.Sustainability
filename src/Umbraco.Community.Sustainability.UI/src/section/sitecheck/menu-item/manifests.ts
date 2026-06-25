import type { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";
import { SUSTAINABILITY_SITECHECK_ROOT_ENTITY_TYPE } from "../types.js";

const menuItem: ManifestMenuItem = {
  type: "menuItem",
  alias: "Umbraco.Community.Sustainability.MenuItem.SiteCheck",
  name: "Site Check",
  weight: 1500,
  meta: {
    label: "#sustainability_siteCheck",
    icon: "icon-globe",
    entityType: SUSTAINABILITY_SITECHECK_ROOT_ENTITY_TYPE,
    menus: ["Umbraco.Community.Sustainability.Menu"],
  }
};

export const manifests = [menuItem];
