import type { ManifestMenu, ManifestMenuItem, ManifestSection, ManifestSectionSidebarApp, ManifestTypes } from "@umbraco-cms/backoffice/extension-registry";

export const SUSTAINABILITY_SECTION_ALIAS = "Umb.Section.Sustainability";
export const SUSTAINABILITY_MENU_ALIAS = "Umb.Menu.Sustainability";

const section: ManifestSection = {
  type: "section",
  alias: SUSTAINABILITY_SECTION_ALIAS,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability",
  },
};

const menu: ManifestMenu = {
  type: "menu",
  alias: SUSTAINABILITY_MENU_ALIAS,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability",
  },
};

const menuItem: ManifestMenuItem[] = [
  {
    type: 'menuItem',
    alias: '"Sustainability.MenuItem.Overview',
    name: 'Sustainability Overview Menu Item',
    weight: 200,
    meta: {
      label: 'Overview',
      icon: 'icon-eco',
      menus: [SUSTAINABILITY_MENU_ALIAS],
      entityType: 'overview-root',
    }
  },
  {
    type: 'menuItem',
    alias: '"Sustainability.MenuItem.Stats',
    name: 'Sustainability Stats Menu Item',
    weight: 100,
    meta: {
      label: 'Stats',
      icon: 'icon-chart',
      menus: [SUSTAINABILITY_MENU_ALIAS],
      entityType: 'stats-root',
    }
  }
]

const menuSectionSidebarApp: ManifestSectionSidebarApp = {
  type: "sectionSidebarApp",
  kind: "menuWithEntityActions",
  alias: "Umb.SidebarMenu.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: SUSTAINABILITY_MENU_ALIAS,
    entity: 'sustainability-root'
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: SUSTAINABILITY_SECTION_ALIAS
    }
  ]
}


export const manifests: Array<ManifestTypes> = [
  section,
  menu,
  ...menuItem,
  menuSectionSidebarApp
];
