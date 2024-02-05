import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { DataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { SustainabilityResource, SustainabilityResponse } from "../../api";

export interface SustainabilityDataSource {

  checkPage(pageGuid: string): Promise<DataSourceResponse<SustainabilityResponse>>;
  getPageData(pageGuid: string): Promise<DataSourceResponse<SustainabilityResponse>>;
  savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<DataSourceResponse<boolean>>;

}

export class SustainabilityManagementDataSource implements SustainabilityDataSource {

  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async checkPage(pageGuid: string): Promise<DataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.getUmbracoSustainabilityApiV1CheckPage({ pageGuid: pageGuid }));
  }

  async getPageData(pageGuid: string): Promise<DataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.getUmbracoSustainabilityApiV1GetPageData({ pageGuid: pageGuid }));
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<DataSourceResponse<boolean>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.postUmbracoSustainabilityApiV1SavePageData({
      pageGuid: pageGuid,
      requestBody: sustainabilityResponse
    }))
  }

}