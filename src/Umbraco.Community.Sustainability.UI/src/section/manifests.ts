import { ManifestMenu } from "@umbraco-cms/backoffice/menu";
import { ManifestSection, ManifestSectionSidebarApp, ManifestSectionView } from "@umbraco-cms/backoffice/section";

import { manifests as statsManifests } from './stats/manifests';
import { manifests as sitecheckManifests } from './sitecheck/manifests';

const sectionAlias = "Umbraco.Community.Sustainability.Section";
const menuAlias = "Umbraco.Community.Sustainability.Menu";

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
  alias: "Umbraco.Community.Sustainability.SectionView",
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
  alias: "Umbraco.Community.Sustainability.SectionSidebar",
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
  ...statsManifests,
  ...sitecheckManifests
]
