import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { html, customElement, css, state, repeat } from '@umbraco-cms/backoffice/external/lit'
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/document';
import SustainabilityContext, { SUSTAINABILITY_CONTEXT } from "../../context/sustainability.context";
import { ExternalResourceGroup, SustainabilityResponse } from "../../api";

@customElement('sustainability-workspace-view')
export class SustainabilityWorkspaceElement extends UmbLitElement {

  #sustainabilityContext?: SustainabilityContext;

  @state()
  private _documentUnique?: string = '';

  @state()
  waiting?: boolean = false;

  @state()
  pageData?: SustainabilityResponse | undefined = undefined;

  constructor() {
    super();

    this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (instance) => {

      this.observe(instance?.unique, (unique) => {
        this._documentUnique = unique?.toString();
      });
    });

    this.consumeContext(SUSTAINABILITY_CONTEXT, (instance) => {
      this.#sustainabilityContext = instance;
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    if (this.#sustainabilityContext != null) {
      if (this._documentUnique) {
        this.pageData = await this.#sustainabilityContext.getPageData(this._documentUnique);
      }
    }
  }

  async checkPage() {
    this.waiting = true;
    if (this._documentUnique) {
      this.pageData = await this.#sustainabilityContext?.checkPage(this._documentUnique, false);
      if (this.pageData) {
        this.waiting = false;
      }
    }
  }

  override render() {
    if (this.pageData === undefined) {
      return html`
          <uui-box headline=${this.localize.term('sustainability_loadingReport')}>
              <p><umb-localize key="sustainability_noReportYet">It looks like you haven't run a report on this page yet. Click the button below to get started.</umb-localize></p>
              <uui-button label=${this.localize.term('sustainability_runReport')} look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
                <umb-localize key="sustainability_runReport">Run sustainability report</umb-localize>
              </uui-button>
          </uui-box>
      `;
    }
    else {
      return html`
            <div class="container">
              ${repeat(
        this.pageData?.resourceGroups!,
        (group) => group.name,
        (group) => this.#renderResourceGroup(group)
      )}
            </div>
            <div class="container">
              <uui-box headline=${this.localize.term('sustainability_carbonRating')}>
                <sustainability-carbon-rating slot="header-actions" .carbonRating=${this.pageData?.carbonRating}></sustainability-carbon-rating>
                <p class="last-tested"><strong><umb-localize key="sustainability_lastTested">Last tested:</umb-localize></strong> ${new Intl.DateTimeFormat('en-GB', { dateStyle: "long", timeStyle: "short" }).format(new Date(this.pageData?.lastRunDate!))}</p>
                <uui-button label=${this.localize.term('sustainability_runAgain')} look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
                  <umb-localize key="sustainability_runAgain">Run again</umb-localize>
                </uui-button>
              </uui-box>

              <div class="flex">
                <uui-box headline=${this.localize.term('sustainability_pageSize')}>
                  ${(this.pageData!.totalSize / 1024).toFixed(2)}KB
                </uui-box>
                <uui-box headline=${this.localize.term('sustainability_co2PerPageView')}>
                  ${this.pageData?.totalEmissions.toFixed(4)}g
                </uui-box>
              </div>

              <uui-box headline=${this.localize.term('sustainability_estimations')}>
                <p>
                  <umb-localize key="sustainability_estimationsDescription">This data is based on resources loaded and uses</umb-localize> <a href="https://developers.thegreenwebfoundation.org/co2js/overview/">CO2.js</a> to
                  convert page weight to carbon emissions.
                </p>
                <p><umb-localize key="sustainability_estimationsGuideline">Please use as a guideline to diagnose and highlight potential areas of improvement.</umb-localize></p>
              </uui-box>
            </div>
          `;
    }
  }

  #renderResourceGroup(group: ExternalResourceGroup) {
    return html`
        <uui-box headline=${group.name!}>
        <p slot="header-actions" class="resource-group-header"><umb-localize key="sustainability_totalSize">Total size:</umb-localize> ${(group.totalSize / 1024).toFixed(2)}KB</p>
          <ul class="resource-list">
          ${repeat(
      group.resources!,
            (resource) => resource.url,
            (resource) => html`<li>${resource.url} (${(resource?.size! / 1024).toFixed(2)}KB)</li>`
    )}
          </ul>
        </uui-box>
      `;
  }

  static styles = css`
        :host {
            display: grid;
            gap: var(--uui-size-layout-1);
            padding: var(--uui-size-layout-1);
            grid-template-columns: 1fr 400px;
        }

        div.container {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-layout-1);
        }

        .flex {
          display: flex;
          flex-direction: row;
          gap: var(--uui-size-layout-1);

          uui-box {
            flex: 1;
          }
        }

        .resource-group-header {
          margin: 0;
        }

        .resource-list {
          margin: 0;
          padding-left: var(--uui-size-layout-1);
        }

        .last-tested {
          margin-top: 0;
        }
    `
}

export default SustainabilityWorkspaceElement;
