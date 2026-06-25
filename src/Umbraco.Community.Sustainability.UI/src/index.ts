import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

import { manifests as contextManifests } from './context/manifests';
import { manifests as documentManifests } from './documents/manifest.ts';
import { manifests as sectionManifests } from './section/manifests.ts';
import { manifests as localizationManifests } from './localization/manifests.ts';

import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import SustainabilityContext, { SUSTAINABILITY_CONTEXT } from './context/sustainability.context.ts';
import { client } from './api/index.ts';

export * from './components/index';
export * from './repository/index';

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {

  extensionRegistry.registerMany(localizationManifests);

  host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
    if (!authContext) return;

    const config = authContext.getOpenApiConfiguration();

    client.setConfig({
      auth: () => authContext.getLatestToken(),
      baseUrl: config.base,
      credentials: config.credentials,
    });

    client.interceptors.request.use(async (request, _options) => {
      const token = await config.token();
      request.headers.set('Authorization', `Bearer ${token}`);
      return request;
    });

    extensionRegistry.registerMany([
      ...contextManifests,
      ...documentManifests,
      ...sectionManifests
    ]);

    host.provideContext(SUSTAINABILITY_CONTEXT, new SustainabilityContext(host));
  });

};
