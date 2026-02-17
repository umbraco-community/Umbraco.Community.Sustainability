import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { html as n, repeat as m, css as f, state as d, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/document";
import { S as w } from "./index-K_FP3dB7.js";
var k = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, r = (t, i, e, s) => {
  for (var a = s > 1 ? void 0 : s ? $(i, e) : i, u = t.length - 1, c; u >= 0; u--)
    (c = t[u]) && (a = (s ? c(i, e, a) : c(a)) || a);
  return s && a && k(i, e, a), a;
}, b = (t, i, e) => i.has(t) || y("Cannot " + e), p = (t, i, e) => (b(t, i, "read from private field"), i.get(t)), g = (t, i, e) => i.has(t) ? y("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), D = (t, i, e, s) => (b(t, i, "write to private field"), i.set(t, e), e), S = (t, i, e) => (b(t, i, "access private method"), e), l, h, _;
let o = class extends v {
  constructor() {
    super(), g(this, h), g(this, l), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(x, (t) => {
      this.observe(t == null ? void 0 : t.unique, (i) => {
        this._documentUnique = i == null ? void 0 : i.toString();
      });
    }), this.consumeContext(w, (t) => {
      D(this, l, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), p(this, l) != null && this._documentUnique && (this.pageData = await p(this, l).getPageData(this._documentUnique));
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (this.pageData = await ((t = p(this, l)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.pageData && (this.waiting = !1));
  }
  render() {
    var t, i, e, s;
    return this.pageData === void 0 ? n`
          <uui-box headline=${this.localize.term("sustainability_loadingReport")}>
              <p><umb-localize key="sustainability_noReportYet">It looks like you haven't run a report on this page yet. Click the button below to get started.</umb-localize></p>
              <uui-button label=${this.localize.term("sustainability_runReport")} look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                <umb-localize key="sustainability_runReport">Run sustainability report</umb-localize>
              </uui-button>
          </uui-box>
      ` : n`
            <div class="container">
              ${m(
      (t = this.pageData) == null ? void 0 : t.resourceGroups,
      (a) => a.name,
      (a) => S(this, h, _).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline=${this.localize.term("sustainability_carbonRating")}>
                <sustainability-carbon-rating slot="header-actions" .carbonRating=${(i = this.pageData) == null ? void 0 : i.carbonRating}></sustainability-carbon-rating>
                <p class="last-tested"><strong><umb-localize key="sustainability_lastTested">Last tested:</umb-localize></strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((e = this.pageData) == null ? void 0 : e.lastRunDate))}</p>
                <uui-button label=${this.localize.term("sustainability_runAgain")} look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                  <umb-localize key="sustainability_runAgain">Run again</umb-localize>
                </uui-button>
              </uui-box>

              <div class="flex">
                <uui-box headline=${this.localize.term("sustainability_pageSize")}>
                  ${(this.pageData.totalSize / 1024).toFixed(2)}KB
                </uui-box>
                <uui-box headline=${this.localize.term("sustainability_co2PerPageView")}>
                  ${(s = this.pageData) == null ? void 0 : s.totalEmissions.toFixed(4)}g
                </uui-box>
              </div>

              <uui-box headline=${this.localize.term("sustainability_estimations")}>
                <p>
                  <umb-localize key="sustainability_estimationsDescription">This data is based on resources loaded and uses</umb-localize> <a href="https://developers.thegreenwebfoundation.org/co2js/overview/">CO2.js</a> to
                  convert page weight to carbon emissions.
                </p>
                <p><umb-localize key="sustainability_estimationsGuideline">Please use as a guideline to diagnose and highlight potential areas of improvement.</umb-localize></p>
              </uui-box>
            </div>
          `;
  }
};
l = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  return n`
        <uui-box headline=${t.name}>
        <p slot="header-actions" class="resource-group-header"><umb-localize key="sustainability_totalSize">Total size:</umb-localize> ${(t.totalSize / 1024).toFixed(2)}KB</p>
          <ul class="resource-list">
          ${m(
    t.resources,
    (i) => i.url,
    (i) => n`<li>${i.url} (${((i == null ? void 0 : i.size) / 1024).toFixed(2)}KB)</li>`
  )}
          </ul>
        </uui-box>
      `;
};
o.styles = f`
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
    `;
r([
  d()
], o.prototype, "_documentUnique", 2);
r([
  d()
], o.prototype, "waiting", 2);
r([
  d()
], o.prototype, "pageData", 2);
o = r([
  z("sustainability-workspace-view")
], o);
const T = o;
export {
  o as SustainabilityWorkspaceElement,
  T as default
};
//# sourceMappingURL=sustainability-workspace-view-CZfqbYSB.js.map
