import { AveragePageMetrics, DirectionModel, PagedResultPageMetricModel, SustainabilityResponse } from "../api";
import { SustainabilityRepository } from "../repository/sustainability.repository";
import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";

export class SustainabilityContext extends UmbControllerBase {
  
  #repository: SustainabilityRepository;

  #pageData = new UmbObjectState<SustainabilityResponse | undefined>(undefined);
  public readonly pageData = this.#pageData.asObservable();

  #overviewData = new UmbObjectState<PagedResultPageMetricModel | undefined>(undefined);
  public readonly overviewData = this.#overviewData.asObservable();

  #averageData = new UmbObjectState<AveragePageMetrics | undefined>(undefined);
  public readonly averageData = this.#averageData.asObservable();

  constructor(host: UmbControllerHost) {
    super(host);
    this.#repository = new SustainabilityRepository(this);
  }

  async checkPage(pageGuid: string, initialLoad: boolean = true) {
    const { data } = await this.#repository.checkPage(pageGuid);
    if (data) {
      this.#pageData.setValue(data);

      if (!initialLoad) {
        await this.savePageData(pageGuid, data);
      }
    }
  }

  async getPageData(pageGuid: string, initialLoad: boolean = true) {
    const { data } = await this.#repository.getPageData(pageGuid);
    if (data) {
      this.#pageData.setValue(data);

      if (!initialLoad) {
        await this.savePageData(pageGuid, data);
      }
    }
  }
  
  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse) {
    const saved = await this.#repository.savePageData(pageGuid, sustainabilityResponse);
    return saved;
  }

  async getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number) {
    const { data } = await this.#repository.getOverviewData(direction, orderBy, pageNumber, pageSize);
    if (data) {
      this.#overviewData.setValue(data);
    }
  }

  async getAverageData() {
    const { data } = await this.#repository.getAverageData();
    if (data) {
      this.#averageData.setValue(data);
    }
  }
  
}

export default SustainabilityContext;

export const SUSTAINABILITY_CONTEXT =
  new UmbContextToken<SustainabilityContext>('SustainabilityContext');
