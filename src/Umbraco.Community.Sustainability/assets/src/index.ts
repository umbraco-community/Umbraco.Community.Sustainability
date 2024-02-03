import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

import { manifests as documentManifests } from './documents/manifest.ts';

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
  
  extensionRegistry.registerMany([
    ...documentManifests
  ]);

};
