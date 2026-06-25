import { html as a, css as h, state as u, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as p } from "@umbraco-cms/backoffice/notification";
import { a as b } from "./index-Hdj1WB0a.js";
var d = Object.defineProperty, k = Object.getOwnPropertyDescriptor, s = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? k(t, i) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (r = (o ? c(t, i, r) : c(r)) || r);
  return o && r && d(t, i, r), r;
};
let l = class extends g {
  constructor() {
    super(), this.isCheckingStatus = !0, this.isRunning = !1, this.totalPages = 0, this.pagesCompleted = 0, this.results = [], this.errors = [], this.abortController = null, this.consumeContext(p, (e) => {
      this.notificationContext = e;
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.checkRunningStatus();
  }
  async checkRunningStatus() {
    this.isCheckingStatus = !0;
    try {
      const { data: e } = await b.isSiteCheckRunning();
      this.isRunning = e ?? !1;
    } catch (e) {
      console.error("Failed to check site check status", e);
    } finally {
      this.isCheckingStatus = !1;
    }
  }
  startSiteCheck() {
    this.isRunning = !0, this.results = [], this.errors = [], this.totalPages = 0, this.pagesCompleted = 0, this.abortController = new AbortController(), this.streamSiteCheck();
  }
  async streamSiteCheck() {
    var e, t;
    try {
      const { stream: i } = await b.startSiteCheck({
        signal: (e = this.abortController) == null ? void 0 : e.signal
      });
      for await (const o of i)
        this.handleProgressEvent(o);
    } catch (i) {
      i instanceof Error && i.name !== "AbortError" && ((t = this.notificationContext) == null || t.peek("danger", {
        data: {
          headline: this.localize.term("sustainability_siteCheckError"),
          message: i.message
        }
      }));
    } finally {
      this.isRunning = !1, this.abortController = null;
    }
  }
  handleProgressEvent(e) {
    var t;
    switch (e.type) {
      case "discovery":
        this.totalPages = e.totalPages || 0;
        break;
      case "result":
        this.pagesCompleted = e.pagesCompleted || this.pagesCompleted + 1, this.results = [...this.results, e];
        break;
      case "error":
        this.pagesCompleted = e.pagesCompleted || this.pagesCompleted + 1, this.errors = [...this.errors, e], e.error && ((t = this.notificationContext) == null || t.peek("warning", {
          data: {
            headline: this.localize.term("sustainability_siteCheckPageCheckFailed"),
            message: `${e.url}: ${e.error}`
          }
        }));
        break;
    }
  }
  cancelSiteCheck() {
    this.abortController && (this.abortController.abort(), this.isRunning = !1);
  }
  getProgressPercent() {
    return this.totalPages > 0 ? Math.round(this.pagesCompleted / this.totalPages * 100) : 0;
  }
  render() {
    if (this.isCheckingStatus)
      return a`
        <uui-box>
          <div class="loading-state">
            <uui-loader></uui-loader>
            <p>
              <umb-localize key="sustainability_checkingStatus">Checking status...</umb-localize>
            </p>
          </div>
        </uui-box>
      `;
    const e = this.getProgressPercent();
    return this.isRunning ? a`
        <uui-box>
          <div class="running-state">
            <h2>
              ${this.pagesCompleted} / ${this.totalPages}
              <umb-localize key="sustainability_pagesChecked">Pages checked</umb-localize>
            </h2>
            <uui-progress-bar value="${e}"></uui-progress-bar>
            <p class="progress-text">
              ${e}<umb-localize key="sustainability_percentComplete">% complete</umb-localize>
            </p>

            <uui-button
              @click=${() => this.cancelSiteCheck()}
              look="primary"
              color="danger"
              label=${this.localize.term("sustainability_cancelSiteCheck")}>
              <umb-localize key="sustainability_cancelSiteCheck">Cancel Check</umb-localize>
            </uui-button>

            ${this.results.length > 0 ? a`
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
      (t) => {
        var i, o;
        return a`
                          <uui-table-row>
                            <uui-table-cell>
                              <uui-button
                                href="${t.url}"
                                target="_blank"
                                label=${t.nodeName || t.url}
                                compact>
                                ${t.nodeName || t.url}
                              </uui-button>
                            </uui-table-cell>
                            <uui-table-cell>
                              <span class="rating rating-${t.carbonRating}">
                                ${t.carbonRating || a`<umb-localize key="sustainability_notAvailable">N/A</umb-localize>`}
                              </span>
                            </uui-table-cell>
                            <uui-table-cell>${(i = t.totalSize) == null ? void 0 : i.toLocaleString()}</uui-table-cell>
                            <uui-table-cell>${(o = t.totalEmissions) == null ? void 0 : o.toFixed(2)}</uui-table-cell>
                          </uui-table-row>
                        `;
      }
    )}
                    </uui-table>
                  </uui-box>
                ` : a``}

            ${this.errors.length > 0 ? a`
                  <h3><umb-localize key="sustainability_errors">Errors</umb-localize></h3>
                  <div class="error-list">
                    ${this.errors.map(
      (t) => a`
                        <uui-box class="error-item">
                          <strong>${t.url}</strong>: ${t.error}
                        </uui-box>
                      `
    )}
                  </div>
                ` : a``}
          </div>
        </uui-box>
      ` : a`
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
};
l.styles = h`
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
s([
  u()
], l.prototype, "isCheckingStatus", 2);
s([
  u()
], l.prototype, "isRunning", 2);
s([
  u()
], l.prototype, "totalPages", 2);
s([
  u()
], l.prototype, "pagesCompleted", 2);
s([
  u()
], l.prototype, "results", 2);
s([
  u()
], l.prototype, "errors", 2);
l = s([
  m("sustainability-sitecheck-workspace")
], l);
const x = l;
export {
  l as SiteCheckWorkspaceElement,
  x as default
};
//# sourceMappingURL=sitecheck-workspace.element-DRv_XzMC.js.map
