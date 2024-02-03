import { UmbBaseController } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { SustainabilityManagementDataSource } from "./sources/sustainability.datasource";
import { Configuration, UmbracoSustainabilityApiV1SavePageDataPostRequest } from "../api";

export class SustainabilityManagementRepository extends UmbBaseController {
  #sustainabilityDataSource: SustainabilityManagementDataSource;

  constructor(host: UmbControllerHost, configuration: Configuration) {
    super(host);
    this.#sustainabilityDataSource = new SustainabilityManagementDataSource(this, configuration);

    console.log('repository constructor');
  }

  async checkPage(pageId: number) {
    return this.#sustainabilityDataSource.checkPage(pageId);
  }

  async getPageData(pageId: number) {
    return this.#sustainabilityDataSource.getPageData(pageId);
  }

  async savePageData(pageId: number, sustainabilityResponse: UmbracoSustainabilityApiV1SavePageDataPostRequest) {
    return this.#sustainabilityDataSource.savePageData(pageId, sustainabilityResponse);
  }
}