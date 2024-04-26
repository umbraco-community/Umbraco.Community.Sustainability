import type { ManifestDashboard } from "@umbraco-cms/backoffice/extension-registry";

const dashboards: Array<ManifestDashboard> = [
  {
    type: "dashboard",
    alias: "Umb.Dashboard.Sustainability",
    name: "Sustainability Overview",
    elementName: "sustainability-overview-dashboard",
    js: () => import("./sustainability.dashboard.element"),
    meta: {
      label: "Overview",
      pathname: "overview",
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Sustainability",
      },
    ],
  }
];

export const manifests = [...dashboards];