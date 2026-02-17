import { AveragePageMetrics, DirectionModel, PagedPageMetricModel, SustainabilityResponse } from "../api";
import { SustainabilityRepository } from "../repository/sustainability.repository";
import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';

export class SustainabilityContext extends UmbControllerBase {

  #repository: SustainabilityRepository;
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  #overviewData = new UmbObjectState<PagedPageMetricModel | undefined>(undefined);
  public readonly overviewData = this.#overviewData.asObservable();

  #averageData = new UmbObjectState<AveragePageMetrics | undefined>(undefined);
  public readonly averageData = this.#averageData.asObservable();

  constructor(host: UmbControllerHost) {
    super(host);
    this.#repository = new SustainabilityRepository(this);
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => {
      this.#notificationContext = context;
    });
  }

  async checkPage(pageGuid: string, initialLoad: boolean = true) {
    const { data, error } = await this.#repository.checkPage(pageGuid);
    if (error) {
      this.#notificationContext?.peek('danger', {
        data: { message: 'Failed to check page sustainability.' }
      });
      return undefined;
    }
    if (data) {
      if (!initialLoad) {
        await this.savePageData(pageGuid, data);
      }

      return data;
    }

    return undefined;
  }

  async getPageData(pageGuid: string) {
    const { data, error } = await this.#repository.getPageData(pageGuid);
    if (error) {
      this.#notificationContext?.peek('danger', {
        data: { message: 'Failed to load page data.' }
      });
      return undefined;
    }
    if (data) {
      return data;
    }

    return undefined;
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse) {
    const saved = await this.#repository.savePageData(pageGuid, sustainabilityResponse);
    return saved;
  }

  async getOverviewData(direction: DirectionModel, orderBy: string, pageNumber: number, pageSize: number) {
    const { data, error } = await this.#repository.getOverviewData(direction, orderBy, pageNumber, pageSize);
    if (error) {
      this.#notificationContext?.peek('danger', {
        data: { message: 'Failed to load overview data.' }
      });
      return;
    }
    if (data) {
      this.#overviewData.setValue(data);
    }
  }

  async getAverageData() {
    const { data, error } = await this.#repository.getAverageData();
    if (error) {
      this.#notificationContext?.peek('danger', {
        data: { message: 'Failed to load average data.' }
      });
      return;
    }
    if (data) {
      this.#averageData.setValue(data);
    }
  }

}

export default SustainabilityContext;

export const SUSTAINABILITY_CONTEXT =
  new UmbContextToken<SustainabilityContext>('SustainabilityContext');
