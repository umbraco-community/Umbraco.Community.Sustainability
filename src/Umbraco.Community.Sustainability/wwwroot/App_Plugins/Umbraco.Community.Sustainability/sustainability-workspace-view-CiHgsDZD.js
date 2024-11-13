import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
import { LitElement as y, html as r, repeat as m, css as x, state as h, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as w } from "@umbraco-cms/backoffice/workspace";
import { S as C } from "./index-BOus3T3d.js";
var k = Object.defineProperty, D = Object.getOwnPropertyDescriptor, u = (t, i, e, s) => {
  for (var a = s > 1 ? void 0 : s ? D(i, e) : i, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (a = (s ? p(i, e, a) : p(a)) || a);
  return s && a && k(i, e, a), a;
}, g = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
}, c = (t, i, e) => (g(t, i, "read from private field"), e ? e.call(t) : i.get(t)), v = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, $ = (t, i, e, s) => (g(t, i, "write to private field"), s ? s.call(t, e) : i.set(t, e), e), S = (t, i, e) => (g(t, i, "access private method"), e), o, d, f;
let n = class extends b(y) {
  constructor() {
    super(), v(this, d), v(this, o, void 0), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(w, (t) => {
      const i = t;
      this.observe(i.unique, (e) => {
        this._documentUnique = e;
      });
    }), this.consumeContext(C, (t) => {
      $(this, o, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), c(this, o) != null && this._documentUnique && (this.pageData = await c(this, o).getPageData(this._documentUnique));
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (this.pageData = await ((t = c(this, o)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.waiting = !1);
  }
  render() {
    var t, i, e, s;
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
      (a) => S(this, d, f).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating slot="header-actions" .carbonRating=${(i = this.pageData) == null ? void 0 : i.carbonRating}></sustainability-carbon-rating>
                <p style="margin-top: 0;"><strong>Last tested:</strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((e = this.pageData) == null ? void 0 : e.lastRunDate))}</p>
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
d = /* @__PURE__ */ new WeakSet();
f = function(t) {
  var i;
  if (((i = t.resources) == null ? void 0 : i.length) !== 0)
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
const R = n;
export {
  n as SustainabilityWorkspaceElement,
  R as default
};
//# sourceMappingURL=sustainability-workspace-view-CiHgsDZD.js.map
