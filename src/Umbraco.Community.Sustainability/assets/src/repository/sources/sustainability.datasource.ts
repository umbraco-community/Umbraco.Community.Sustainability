import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { DataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { Configuration, SustainabilityApi, UmbracoSustainabilityApiV1SavePageDataPostRequest } from "../../api";

export interface SustainabilityDataSource {

  checkPage(pageId: number): Promise<DataSourceResponse<void>>;
  getPageData(pageId: number): Promise<DataSourceResponse<string>>;
  savePageData(pageId: number, sustainabilityResponse: UmbracoSustainabilityApiV1SavePageDataPostRequest): Promise<DataSourceResponse<void>>;

}

export class SustainabilityManagementDataSource implements SustainabilityDataSource {

  #host: UmbControllerHost;
  sustainabilityApi: SustainabilityApi;

  constructor(host: UmbControllerHost, configuration: Configuration) {
    this.#host = host;
    this.sustainabilityApi = new SustainabilityApi(configuration);
  }

  async checkPage(pageId: number): Promise<DataSourceResponse<void>> {
    return await tryExecuteAndNotify(this.#host, this.sustainabilityApi.umbracoSustainabilityApiV1CheckPageGet({ pageId: pageId }));
  }

  async getPageData(pageId: number): Promise<DataSourceResponse<string>> {
    return await tryExecuteAndNotify(this.#host, this.sustainabilityApi.umbracoSustainabilityApiV1GetPageDataGet({ pageId: pageId }));
  }

  async savePageData(pageId: number, sustainabilityResponse: UmbracoSustainabilityApiV1SavePageDataPostRequest): Promise<DataSourceResponse<void>> {
    return await tryExecuteAndNotify(this.#host, this.sustainabilityApi.umbracoSustainabilityApiV1SavePageDataPost({
      pageId: pageId,
      umbracoSustainabilityApiV1SavePageDataPostRequest: sustainabilityResponse
    }))
  }

}