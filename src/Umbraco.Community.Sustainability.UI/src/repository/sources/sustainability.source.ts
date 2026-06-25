import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { SustainabilityService, type SustainabilityResponse, DirectionModel, AveragePageMetrics, GetOverviewDataResponse } from "../../api";

export interface SustainabilityDataSource {
  checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>>;
  getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number): Promise<UmbDataSourceResponse<GetOverviewDataResponse>>;
  getAverageData(): Promise<UmbDataSourceResponse<AveragePageMetrics>>;
}

export class SustainabilityManagementDataSource implements SustainabilityDataSource {
  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecute(this.#host, SustainabilityService.getCheckPage({ query: { pageGuid: pageGuid } }));
  }

  async getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecute(this.#host, SustainabilityService.getPageData({ query: { pageGuid: pageGuid } }));
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>> {
    return await tryExecute(this.#host, SustainabilityService.postSavePageData({
      query: { pageGuid: pageGuid },
      body: sustainabilityResponse
    }))
  }

  async getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number): Promise<UmbDataSourceResponse<GetOverviewDataResponse>> {
    return await tryExecute(this.#host, SustainabilityService.getOverviewData({ query: { direction, orderBy, pageNumber, pageSize } }));
  }

  async getAverageData(): Promise<UmbDataSourceResponse<AveragePageMetrics>> {
    return await tryExecute(this.#host, SustainabilityService.getAverageData());
  }
}
