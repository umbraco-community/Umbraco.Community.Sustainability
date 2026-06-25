import { ManifestWorkspaceContext } from '@umbraco-cms/backoffice/workspace';

const context: ManifestWorkspaceContext = {
  type: 'workspaceContext',
  alias: "Sustainability.Workspace.Context",
  name: 'Overview Workspace Context',
  js: () => import('./sustainability.context.js'),
};

export const manifests = [
  context
];
