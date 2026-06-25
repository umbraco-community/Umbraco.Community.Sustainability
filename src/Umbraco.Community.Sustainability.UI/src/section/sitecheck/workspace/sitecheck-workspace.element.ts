import { css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import type { UmbNotificationContext } from "@umbraco-cms/backoffice/notification";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { SustainabilityService } from "../../../api/sdk.gen.js";
import type { SiteCheckProgressDto } from "../../../api/types.gen.js";

@customElement("sustainability-sitecheck-workspace")
export class SiteCheckWorkspaceElement extends UmbLitElement {
  @state()
  private isCheckingStatus = true;

  @state()
  private isRunning = false;

  @state()
  private totalPages = 0;

  @state()
  private pagesCompleted = 0;

  @state()
  private results: SiteCheckProgressDto[] = [];

  @state()
  private errors: SiteCheckProgressDto[] = [];

  private abortController: AbortController | null = null;
  private notificationContext?: UmbNotificationContext;

  constructor() {
    super();
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => {
      this.notificationContext = context;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkRunningStatus();
  }

  private async checkRunningStatus() {
    this.isCheckingStatus = true;
    try {
      const { data } = await SustainabilityService.isSiteCheckRunning();
      this.isRunning = data ?? false;
    } catch (e) {
      console.error("Failed to check site check status", e);
    } finally {
      this.isCheckingStatus = false;
    }
  }

  private startSiteCheck() {
    this.isRunning = true;
    this.results = [];
    this.errors = [];
    this.totalPages = 0;
    this.pagesCompleted = 0;

    this.abortController = new AbortController();

    this.streamSiteCheck();
  }

  private async streamSiteCheck() {
    try {
      const { stream } = await SustainabilityService.startSiteCheck({
        signal: this.abortController?.signal,
      });

      for await (const event of stream) {
        this.handleProgressEvent(event);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        this.notificationContext?.peek("danger", {
          data: {
            headline: this.localize.term("sustainability_siteCheckError"),
            message: error.message,
          },
        });
      }
    } finally {
      this.isRunning = false;
      this.abortController = null;
    }
  }

  private handleProgressEvent(event: SiteCheckProgressDto) {
    switch (event.type) {
      case "discovery":
        this.totalPages = event.totalPages || 0;
        break;
      case "result":
        this.pagesCompleted = event.pagesCompleted || this.pagesCompleted + 1;
        this.results = [...this.results, event];
        break;
      case "error":
        this.pagesCompleted = event.pagesCompleted || this.pagesCompleted + 1;
        this.errors = [...this.errors, event];
        if (event.error) {
          this.notificationContext?.peek("warning", {
            data: {
              headline: this.localize.term("sustainability_siteCheckPageCheckFailed"),
              message: `${event.url}: ${event.error}`,
            },
          });
        }
        break;
    }
  }

  private cancelSiteCheck() {
    if (this.abortController) {
      this.abortController.abort();
      this.isRunning = false;
    }
  }

  private getProgressPercent() {
    return this.totalPages > 0
      ? Math.round((this.pagesCompleted / this.totalPages) * 100)
      : 0;
  }

  render() {
    if (this.isCheckingStatus) {
      return html`
        <uui-box>
          <div class="loading-state">
            <uui-loader></uui-loader>
            <p>
              <umb-localize key="sustainability_checkingStatus">Checking status...</umb-localize>
            </p>
          </div>
        </uui-box>
      `;
    }

    const percent = this.getProgressPercent();

    if (this.isRunning) {
      return html`
        <uui-box>
          <div class="running-state">
            <h2>
              ${this.pagesCompleted} / ${this.totalPages}
              <umb-localize key="sustainability_pagesChecked">Pages checked</umb-localize>
            </h2>
            <uui-progress-bar value="${percent}"></uui-progress-bar>
            <p class="progress-text">
              ${percent}<umb-localize key="sustainability_percentComplete">% complete</umb-localize>
            </p>

            <uui-button
              @click=${() => this.cancelSiteCheck()}
              look="primary"
              color="danger"
              label=${this.localize.term("sustainability_cancelSiteCheck")}>
              <umb-localize key="sustainability_cancelSiteCheck">Cancel Check</umb-localize>
            </uui-button>

            ${this.results.length > 0
              ? html`
                  <h3><umb-localize key="sustainability_results">Results</umb-localize></h3>
                  <uui-box>
                    <uui-table>
                      <uui-table-head>
                        <uui-table-head-cell>
                          <umb-localize key="sustainability_url">URL</umb-localize>
                        </uui-table-head-cell>
                        <uui-table-head-cell>
                          <umb-localize key="sustainability_carbonRating">Carbon Rating</umb-localize>
                        </uui-table-head-cell>
                        <uui-table-head-cell>
                          <umb-localize key="sustainability_sizeBytes">Size (bytes)</umb-localize>
                        </uui-table-head-cell>
                        <uui-table-head-cell>
                          <umb-localize key="sustainability_emissionsGrams">Emissions (g)</umb-localize>
                        </uui-table-head-cell>
                      </uui-table-head>
                      ${this.results.map(
                        (result) => html`
                          <uui-table-row>
                            <uui-table-cell>
                              <uui-button
                                href="${result.url}"
                                target="_blank"
                                label=${result.nodeName || result.url}
                                compact>
                                ${result.nodeName || result.url}
                              </uui-button>
                            </uui-table-cell>
                            <uui-table-cell>
                              <span class="rating rating-${result.carbonRating}">
                                ${result.carbonRating || html`<umb-localize key="sustainability_notAvailable">N/A</umb-localize>`}
                              </span>
                            </uui-table-cell>
                            <uui-table-cell>${result.totalSize?.toLocaleString()}</uui-table-cell>
                            <uui-table-cell>${result.totalEmissions?.toFixed(2)}</uui-table-cell>
                          </uui-table-row>
                        `
                      )}
                    </uui-table>
                  </uui-box>
                `
              : html``}

            ${this.errors.length > 0
              ? html`
                  <h3><umb-localize key="sustainability_errors">Errors</umb-localize></h3>
                  <div class="error-list">
                    ${this.errors.map(
                      (error) => html`
                        <uui-box class="error-item">
                          <strong>${error.url}</strong>: ${error.error}
                        </uui-box>
                      `
                    )}
                  </div>
                `
              : html``}
          </div>
        </uui-box>
      `;
    }

    return html`
      <uui-box>
        <div class="start-state">
          <h2>
            <umb-localize key="sustainability_siteCheckTitle">
              Site-Wide Sustainability Check
            </umb-localize>
          </h2>
          <p>
            <umb-localize key="sustainability_siteCheckIntro">
              Discover all published pages on your site and run sustainability
              checks across them in parallel. Results are saved automatically.
            </umb-localize>
          </p>
          <uui-button
            @click=${() => this.startSiteCheck()}
            look="primary"
            color="positive"
            label=${this.localize.term("sustainability_startSiteCheck")}>
            <umb-localize key="sustainability_startSiteCheck">Start Site Check</umb-localize>
          </uui-button>
        </div>
      </uui-box>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    .loading-state p {
      margin-top: 1rem;
    }

    h2 {
      margin-bottom: 1rem;
      color: var(--uui-color-text);
    }

    h3 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: var(--uui-color-text);
    }

    p {
      margin-bottom: 1.5rem;
      color: var(--uui-color-text-alt);
    }

    uui-button {
      margin-bottom: 1rem;
    }

    .progress-text {
      margin-top: 1rem;
      text-align: center;
    }

    uui-box {
      margin-top: 1rem;
    }

    uui-table a {
      color: var(--uui-color-action);
      text-decoration: none;
    }

    uui-table a:hover {
      text-decoration: underline;
    }

    .rating {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .rating-A+ {
      background-color: #4caf50;
      color: white;
    }

    .rating-A {
      background-color: #8bc34a;
      color: white;
    }

    .rating-B {
      background-color: #cddc39;
      color: rgba(0, 0, 0, 0.87);
    }

    .rating-C {
      background-color: #ffc107;
      color: rgba(0, 0, 0, 0.87);
    }

    .rating-D {
      background-color: #ff9800;
      color: white;
    }

    .rating-E {
      background-color: #ff5722;
      color: white;
    }

    .rating-F {
      background-color: #f44336;
      color: white;
    }

    .error-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .error-item {
      background-color: var(--uui-color-danger-background);
      color: var(--uui-color-danger-text);
      border-left: 4px solid var(--uui-color-danger);
    }

    uui-progress-bar {
      margin: 1rem 0;
    }
  `;
}

export default SiteCheckWorkspaceElement;
