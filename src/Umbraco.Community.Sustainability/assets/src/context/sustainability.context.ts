import { UmbBaseController } from "@umbraco-cms/backoffice/class-api";
import { SustainabilityManagementRepository } from "../repository/sustainability.repository";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { Configuration } from "../api";

import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth'
import { UmbStringState } from "@umbraco-cms/backoffice/observable-api";

export class SustainabilityManagementContext extends UmbBaseController {
  
  #repository: SustainabilityManagementRepository;
  _configuration!: Configuration;

  #pageData = new UmbStringState("unknown");
  public readonly pageData = this.#pageData.asObservable();

  constructor(host: UmbControllerHost) {
    super(host);

    this.provideContext(SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN, this);
    
    this.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {
      this._configuration = new Configuration({ accessToken: _auth.getLatestToken() });
    });

    this.#repository = new SustainabilityManagementRepository(this, this._configuration);
  }

  async getPageData(pageId: number) {
    const { data } = await this.#repository.getPageData(pageId);
    if (data) {
      this.#pageData.setValue(data);
    }
  }

}

export default SustainabilityManagementContext;

export const SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN = new UmbContextToken<SustainabilityManagementContext>(SustainabilityManagementContext.name);