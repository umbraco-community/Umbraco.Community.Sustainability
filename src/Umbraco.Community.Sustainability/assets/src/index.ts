import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

import { manifests as documentManifests } from './documents/manifest.ts';
import { manifests as sectionManifests } from './section/manifests.ts';
import { manifests as dashboardManifests } from './dashboards/manifests.ts';

import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import SustainabilityContext, { SUSTAINABILITY_CONTEXT } from './context/sustainability.context.ts';
import { OpenAPI } from './api/index.ts';

export * from './components/index';
export * from './repository/index';

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {
  
  extensionRegistry.registerMany([
    ...documentManifests,
    ...sectionManifests,
    ...dashboardManifests
  ]);

  host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
    if (!auth) return;
    
    const umbOpenApi = auth.getOpenApiConfiguration();
    OpenAPI.BASE = umbOpenApi.base;
    OpenAPI.TOKEN = umbOpenApi.token;
    OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
    OpenAPI.CREDENTIALS = umbOpenApi.credentials;
  });

  host.provideContext(SUSTAINABILITY_CONTEXT, new SustainabilityContext(host));
};
