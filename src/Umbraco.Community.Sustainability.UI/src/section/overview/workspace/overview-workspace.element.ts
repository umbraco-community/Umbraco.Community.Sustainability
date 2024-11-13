import { SUSTAINABILITY_CONTEXT, SustainabilityContext } from "../../../context/sustainability.context";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";
import { css, customElement, html, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { AveragePageMetrics, PageMetric, PagedResultPageMetricModel } from "../../../api";
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
  _overviewData?: PagedResultPageMetricModel;

  @state()
  _averageData?: AveragePageMetrics;

  @state()
  _greenHost: boolean = false;

  constructor() {
    super();

    this.consumeContext(SUSTAINABILITY_CONTEXT, (instance) => {
      this.#sustainabilityContext = instance;

      this.observe(this.#sustainabilityContext.overviewData, (data) => {
        if (!data) return;
        this._overviewData = data;
      });

      this.observe(this.#sustainabilityContext.averageData, (data) => {
        if (!data) return;
        this._averageData = data;
      })
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    if (this.#sustainabilityContext != null) {
      await this.#sustainabilityContext.getOverviewData(DirectionModel.DESCENDING, "RequestDate", 1, 10);
      await this.#sustainabilityContext.getAverageData();
    }

    if (hosting.check(window.location.hostname, 'Test')) {
      this._greenHost = true;
    }
  }

  #renderNoResults() {
    if (this._overviewData?.items?.length === 0) {
      return html`
        <uui-box>
          No data to show yet. Once you've run some tests, you'll see an overview of all your data here.
        </uui-box>
      `
    }
  }


  #renderResults() {
    if (this._overviewData?.items?.length !== 0) {
      return html`
      <div id="left-column">
        <uui-box>
          <uui-table style="margin-bottom: 24px;">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell>Last Run Date</uui-table-head-cell>
              <uui-table-head-cell>Carbon Rating</uui-table-head-cell>
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

          <uui-button label="See more data" look="primary" href="/umbraco/section/sustainability/workspace/stats-root">
            See more data
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
        <p style="margin: 0;">Loading...</p>
      `
    }
    else if (this._greenHost === false) {
      return html`
        <p style="margin: 0;">No</p>
      `
    }
    else return html`
      <p style="margin: 0;">Yes</p>
    `
  }

  #renderGreenHosting() {
    return html`
    <uui-box headline="Green hosting" style="margin-bottom: var(--uui-size-space-4);">
      <div slot="header">Powered by <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${this.#renderGreenHostingValue()}
    </uui-box>
    `
  }

  #renderSidebar() {
    if (this._overviewData?.items?.length !== 0) {
      return html`
        <div id="right-column">
          ${this.#renderGreenHosting()}

          <uui-box headline="Average carbon rating" style="margin-bottom: var(--uui-size-space-4);">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade(this._averageData?.emissions!)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline="Average page size" style="margin-bottom: var(--uui-size-space-4);">
            ${(this._averageData?.pageSize! / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline="Average CO₂ per page view">
            ${this._averageData?.emissions?.toFixed(4)}g
          </uui-box>

        </div>
      `
    }
  }

  render() {
    return html`
      <umb-body-layout headline="Overview">
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
    `
  ]
}

export default OverviewRootWorkspaceElement;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: OverviewRootWorkspaceElement;
  }
}
