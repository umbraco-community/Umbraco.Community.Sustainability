import { ManifestMenu, ManifestSection, ManifestSectionSidebarAppMenuKind } from "@umbraco-cms/backoffice/extension-registry";

import { manifests as statsManifests } from './stats/manifests';

const sectionAlias = "Umb.Section.Sustainability";
const menuAlias = "Umb.Menu.Sustainability";

const section: ManifestSection = {
  type: "section",
  alias: sectionAlias,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability",
  },
};

const menu: ManifestMenu = {
  type: "menu",
  alias: menuAlias,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability",
  },
};

const menuSectionSidebarApp: ManifestSectionSidebarAppMenuKind = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebarMenu.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: menuAlias,
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: sectionAlias,
    },
  ],
};

export const manifests = [
  section,
  menu,
  menuSectionSidebarApp,
  ...statsManifests
]
