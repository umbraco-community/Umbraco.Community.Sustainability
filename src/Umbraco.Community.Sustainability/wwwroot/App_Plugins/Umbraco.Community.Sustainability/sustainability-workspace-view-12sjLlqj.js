import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
import { LitElement as y, html as r, repeat as m, css as x, state as h, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as w } from "@umbraco-cms/backoffice/document";
import { S as D } from "./index-DylV9Ngt.js";
var C = Object.defineProperty, k = Object.getOwnPropertyDescriptor, u = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? k(t, i) : t, l = e.length - 1, p; l >= 0; l--)
    (p = e[l]) && (a = (s ? p(t, i, a) : p(a)) || a);
  return s && a && C(t, i, a), a;
}, g = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
}, d = (e, t, i) => (g(e, t, "read from private field"), i ? i.call(e) : t.get(e)), v = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, $ = (e, t, i, s) => (g(e, t, "write to private field"), s ? s.call(e, i) : t.set(e, i), i), S = (e, t, i) => (g(e, t, "access private method"), i), o, c, f;
let n = class extends b(y) {
  constructor() {
    super(), v(this, c), v(this, o, void 0), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(w, (e) => {
      this.observe(e.unique, (t) => {
        this._documentUnique = t == null ? void 0 : t.toString();
      });
    }), this.consumeContext(D, (e) => {
      $(this, o, e);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), d(this, o) != null && this._documentUnique && (this.pageData = await d(this, o).getPageData(this._documentUnique));
  }
  async checkPage() {
    var e;
    this.waiting = !0, this._documentUnique && (this.pageData = await ((e = d(this, o)) == null ? void 0 : e.checkPage(this._documentUnique, !1)), this.pageData && (this.waiting = !1));
  }
  render() {
    var e, t, i, s;
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
      (e = this.pageData) == null ? void 0 : e.resourceGroups,
      (a) => a.name,
      (a) => S(this, c, f).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating slot="header-actions" .carbonRating=${(t = this.pageData) == null ? void 0 : t.carbonRating}></sustainability-carbon-rating>
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
o = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
f = function(e) {
  return r`
        <uui-box headline=${e.name}>
        <p slot="header-actions" style="margin: 0">Total size: ${(e.totalSize / 1024).toFixed(2)}KB</p>
          <ul style="margin: 0; padding-left: var(--uui-size-layout-1);">
          ${m(
    e.resources,
    (t) => t.url,
    (t) => r`<li>${t.url} (${((t == null ? void 0 : t.size) / 1024).toFixed(2)}KB)</li>`
  )}
          </ul>
        </uui-box>
      `;
};
n.styles = x`
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
u([
  h()
], n.prototype, "_documentUnique", 2);
u([
  h()
], n.prototype, "waiting", 2);
u([
  h()
], n.prototype, "pageData", 2);
n = u([
  _("sustainability-workspace-view")
], n);
const z = n;
export {
  n as SustainabilityWorkspaceElement,
  z as default
};
//# sourceMappingURL=sustainability-workspace-view-12sjLlqj.js.map
