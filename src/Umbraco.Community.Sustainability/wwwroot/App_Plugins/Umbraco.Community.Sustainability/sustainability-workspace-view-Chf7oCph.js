import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { LitElement as _, html as r, repeat as m, css as x, state as c, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as D } from "@umbraco-cms/backoffice/document";
import { S as C } from "./index-Da7IgOgD.js";
var k = Object.defineProperty, S = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, l = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? S(e, i) : e, u = t.length - 1, p; u >= 0; u--)
    (p = t[u]) && (a = (s ? p(e, i, a) : p(a)) || a);
  return s && a && k(e, i, a), a;
}, g = (t, e, i) => e.has(t) || b("Cannot " + i), d = (t, e, i) => (g(t, e, "read from private field"), e.get(t)), v = (t, e, i) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), $ = (t, e, i, s) => (g(t, e, "write to private field"), e.set(t, i), i), E = (t, e, i) => (g(t, e, "access private method"), i), n, h, f;
let o = class extends y(_) {
  constructor() {
    super(), v(this, h), v(this, n), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(D, (t) => {
      this.observe(t == null ? void 0 : t.unique, (e) => {
        this._documentUnique = e == null ? void 0 : e.toString();
      });
    }), this.consumeContext(C, (t) => {
      $(this, n, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), d(this, n) != null && this._documentUnique && (this.pageData = await d(this, n).getPageData(this._documentUnique));
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (this.pageData = await ((t = d(this, n)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.pageData && (this.waiting = !1));
  }
  render() {
    var t, e, i, s;
    return this.pageData === void 0 ? r`
          <uui-box headline="Loading sustainability report...">
              <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
              <uui-button label="Run sustainability report" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                Run sustainability report
              </uui-button>
          </uui-box>
      ` : r`
            <div class="container">
              ${m(
      (t = this.pageData) == null ? void 0 : t.resourceGroups,
      (a) => a.name,
      (a) => E(this, h, f).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating slot="header-actions" .carbonRating=${(e = this.pageData) == null ? void 0 : e.carbonRating}></sustainability-carbon-rating>
                <p style="margin-top: 0;"><strong>Last tested:</strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((i = this.pageData) == null ? void 0 : i.lastRunDate))}</p>
                <uui-button label="Run again" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                  Run again
                </uui-button>
              </uui-box>

              <div class="flex">
                <uui-box headline="Page size">
                  ${(this.pageData.totalSize / 1024).toFixed(2)}KB
                </uui-box>
                <uui-box headline="CO₂ per page view">
                  ${(s = this.pageData) == null ? void 0 : s.totalEmissions.toFixed(4)}g
                </uui-box>
              </div>

              <uui-box headline="Estimations">
                <p>
                  This data is based on resources loaded and uses <a href="https://developers.thegreenwebfoundation.org/co2js/overview/">CO2.js</a> to
                  convert page weight to carbon emissions.
                </p>
                <p>Please use as a guideline to diagnose and highlight potential areas of improvement.</p>
              </uui-box>
            </div>
          `;
  }
};
n = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
f = function(t) {
  return r`
        <uui-box headline=${t.name}>
        <p slot="header-actions" style="margin: 0">Total size: ${(t.totalSize / 1024).toFixed(2)}KB</p>
          <ul style="margin: 0; padding-left: var(--uui-size-layout-1);">
          ${m(
    t.resources,
    (e) => e.url,
    (e) => r`<li>${e.url} (${((e == null ? void 0 : e.size) / 1024).toFixed(2)}KB)</li>`
  )}
          </ul>
        </uui-box>
      `;
};
o.styles = x`
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
    `;
l([
  c()
], o.prototype, "_documentUnique", 2);
l([
  c()
], o.prototype, "waiting", 2);
l([
  c()
], o.prototype, "pageData", 2);
o = l([
  w("sustainability-workspace-view")
], o);
const O = o;
export {
  o as SustainabilityWorkspaceElement,
  O as default
};
//# sourceMappingURL=sustainability-workspace-view-Chf7oCph.js.map
