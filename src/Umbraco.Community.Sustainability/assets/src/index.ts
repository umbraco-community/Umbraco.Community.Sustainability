import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

import { manifests as documentManifests } from './documents/manifest.ts';
import { manifests as contextManifests } from './context/manifest.ts';
import { manifests as sectionManifests } from './section/manifests.ts';
import { manifests as workspaceManifests } from './workspace/manifests.ts';

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
  
  extensionRegistry.registerMany([
    ...contextManifests,
    ...documentManifests,
    ...sectionManifests,
    ...workspaceManifests
  ]);
};
