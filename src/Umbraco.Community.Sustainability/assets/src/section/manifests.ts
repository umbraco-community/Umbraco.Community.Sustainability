import { ManifestMenu, ManifestSection, ManifestSectionSidebarApp, ManifestSectionView } from "@umbraco-cms/backoffice/extension-registry";

import { manifests as overviewManifests } from './overview/manifests';
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
  conditions: [
    {
      alias: 'Umb.Condition.SectionUserPermission',
      match: sectionAlias
    }
  ]
};

const sectionView: ManifestSectionView = {
  type: 'sectionView',
  alias: "Umb.SectionView.Sustainability",
  name: "Sustainability Section View",
  element: () => import('./sustainability-section-view.element'),
  meta: {
    label: 'Sustainability',
    icon: 'icon-eco',
    pathname: 'view'
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: sectionAlias,
    },
  ]
}

const menu: ManifestMenu = {
  type: "menu",
  alias: menuAlias,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability",
  },
};

const menuSectionSidebarApp: ManifestSectionSidebarApp = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebar.Sustainability",
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
  sectionView,
  menu,
  menuSectionSidebarApp,
  ...overviewManifests,
  ...statsManifests
]
