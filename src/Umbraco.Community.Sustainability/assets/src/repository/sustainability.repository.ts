import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { SustainabilityManagementDataSource } from "./sources/sustainability.datasource";
import { DirectionModel, SustainabilityResponse } from "@api";

export class SustainabilityManagementRepository extends UmbControllerBase {
  #sustainabilityDataSource: SustainabilityManagementDataSource;

  constructor(host: UmbControllerHost) {
    super(host);
    this.#sustainabilityDataSource = new SustainabilityManagementDataSource(this);
  }

  async checkPage(pageGuid: string) {
    return await this.#sustainabilityDataSource.checkPage(pageGuid);
  }

  async getPageData(pageGuid: string) {
    return await this.#sustainabilityDataSource.getPageData(pageGuid);
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse) {
    return await this.#sustainabilityDataSource.savePageData(pageGuid, sustainabilityResponse);
  }

  async getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number) {
    return await this.#sustainabilityDataSource.getOverviewData(direction, orderBy, pageNumber, pageSize);
  }

  async getAverageData() {
    return await this.#sustainabilityDataSource.getAverageData();
  }
}
