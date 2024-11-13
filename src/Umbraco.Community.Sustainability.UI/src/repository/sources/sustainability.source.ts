import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { SustainabilityService, type SustainabilityResponse, DirectionModel, PagedResultPageMetricModel, AveragePageMetrics } from "../../api";

export interface SustainabilityDataSource {

  checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>>;
  getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number): Promise<UmbDataSourceResponse<PagedResultPageMetricModel>>;
  getAverageData(): Promise<UmbDataSourceResponse<AveragePageMetrics>>;

}

export class SustainabilityManagementDataSource implements SustainabilityDataSource {

  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityService.checkPage({ pageGuid: pageGuid }));
  }

  async getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityService.getPageData({ pageGuid: pageGuid }));
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityService.savePageData({
      pageGuid: pageGuid,
      requestBody: sustainabilityResponse
    }))
  }

  async getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number): Promise<UmbDataSourceResponse<PagedResultPageMetricModel>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityService.getOverviewData({ direction, orderBy, pageNumber, pageSize }));
  }

  async getAverageData(): Promise<UmbDataSourceResponse<AveragePageMetrics>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityService.getAverageData());
  }

}
