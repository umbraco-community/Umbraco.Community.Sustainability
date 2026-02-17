import { SUSTAINABILITY_CONTEXT, SustainabilityContext } from "../../../context/sustainability.context";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";
import { css, customElement, html, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { AveragePageMetrics, PageMetric, GetOverviewDataResponse } from "../../../api";
import { hosting } from '@tgwf/co2';

const elementName = "overview-workspace";

@customElement(elementName)
export class OverviewRootWorkspaceElement extends UmbLitElement {

  #sustainabilityContext?: SustainabilityContext;

  #localizeDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  @state()
  _overviewData?: GetOverviewDataResponse;

  @state()
  _averageData?: AveragePageMetrics;

  @state()
  _greenHost: boolean = false;

  constructor() {
    super();

    this.consumeContext(SUSTAINABILITY_CONTEXT, (instance) => {
      if (!instance) return;
      this.#sustainabilityContext = instance;

      this.observe(this.#sustainabilityContext.overviewData, (data) => {
        if (!data) return;
        this._overviewData = data;
      });

      this.observe(this.#sustainabilityContext.averageData, (data) => {
        if (!data) return;
        this._averageData = data;
      });

      this.#sustainabilityContext.getOverviewData(DirectionModel.DESCENDING, "RequestDate", 1, 10);
      this.#sustainabilityContext.getAverageData();
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    if (hosting.check(window.location.hostname, 'Test')) {
      this._greenHost = true;
    }
  }

  #renderNoResults() {
    if (this._overviewData?.items?.length === 0) {
      return html`
        <uui-box>
          <umb-localize key="sustainability_noData">No data to show yet. Once you've run some tests, you'll see an overview of all your data here.</umb-localize>
        </uui-box>
      `
    }
  }


  #renderResults() {
    if (this._overviewData?.items?.length !== 0) {
      return html`
      <div id="left-column">
        <uui-box>
          <uui-table class="overview-table">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_lastRunDate">Last Run Date</umb-localize></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_carbonRating">Carbon Rating</umb-localize></uui-table-head-cell>
            </uui-table-head>

            ${repeat(
        this._overviewData?.items!,
        (item: PageMetric) => item,
        (item: PageMetric) => html`
                <uui-table-row>
                  <uui-table-cell>
                    <a href='/umbraco/section/content/workspace/document/edit/${item.nodeKey}'>
                      ${item.nodeName}
                    </a>
                  </uui-table-cell>
                  <uui-table-cell>
                    <umb-localize-date date=${item.requestDate} .options=${this.#localizeDateOptions}>
                    </umb-localize-date>
                  </uui-table-cell>
                  <uui-table-cell>
                    <sustainability-carbon-rating
                      .carbonRating=${item.carbonRating}>
                    </sustainability-carbon-rating>
                  </uui-table-cell>
                </uui-table-row>
                `
      )}
          </uui-table>

          <uui-button label=${this.localize.term('sustainability_seeMoreData')} look="primary" href="/umbraco/section/sustainability/workspace/stats-root">
            <umb-localize key="sustainability_seeMoreData">See more data</umb-localize>
          </uui-button>
        </uui-box>
        </div>
      `
    }
  }

  _calculateGrade(score: number): string {
    // grade using swd digital carbon ratings
    // https://sustainablewebdesign.org/digital-carbon-ratings/
    if (score < 0.095) {
      return 'A+';
    } else if (score < 0.186) {
      return 'A';
    } else if (score < 0.341) {
      return 'B';
    } else if (score < 0.493) {
      return 'C';
    } else if (score < 0.656) {
      return 'D';
    } else if (score < 0.846) {
      return 'E';
    } else {
      return 'F';
    }
  }

  #renderGreenHostingValue() {
    if (this._greenHost === undefined) {
      return html`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingLoading">Loading...</umb-localize></p>
      `
    }
    else if (this._greenHost === false) {
      return html`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingNo">No</umb-localize></p>
      `
    }
    else return html`
      <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingYes">Yes</umb-localize></p>
    `
  }

  #renderGreenHosting() {
    return html`
    <uui-box headline=${this.localize.term('sustainability_greenHosting')} class="sidebar-box">
      <div slot="header"><umb-localize key="sustainability_greenHostingPoweredBy">Powered by</umb-localize> <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${this.#renderGreenHostingValue()}
    </uui-box>
    `
  }

  #renderSidebar() {
    if (this._overviewData?.items?.length !== 0) {
      return html`
        <div id="right-column">
          ${this.#renderGreenHosting()}

          <uui-box headline=${this.localize.term('sustainability_averageCarbonRating')} class="sidebar-box">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade(this._averageData?.emissions!)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline=${this.localize.term('sustainability_averagePageSize')} class="sidebar-box">
            ${(this._averageData?.pageSize! / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline=${this.localize.term('sustainability_averageCo2PerPageView')}>
            ${this._averageData?.emissions?.toFixed(4)}g
          </uui-box>

        </div>
      `
    }
  }

  render() {
    return html`
      <umb-body-layout headline=${this.localize.term('sustainability_overview')}>
        <div id="main">
          ${this.#renderNoResults()}
          ${this.#renderResults()}
          ${this.#renderSidebar()}
        </div>
      </umb-body-layout>
    `;
  }

  static styles = [
    css`
      #main {
        display: grid;
        gap: var(--uui-size-layout-1);
        grid-template-columns: 1fr 350px;
      }

      .overview-table {
        margin-bottom: 24px;
      }

      .sidebar-box {
        margin-bottom: var(--uui-size-space-4);
      }

      .green-hosting-value {
        margin: 0;
      }
    `
  ]
}

export default OverviewRootWorkspaceElement;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: OverviewRootWorkspaceElement;
  }
}
