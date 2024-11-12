import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { LitElement as _, html as r, repeat as m, css as y, state as d, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/workspace";
import { S as C } from "./index-BTwfBF87.js";
var k = Object.defineProperty, D = Object.getOwnPropertyDescriptor, u = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? D(e, i) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (a = (s ? c(e, i, a) : c(a)) || a);
  return s && a && k(e, i, a), a;
}, g = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, p = (t, e, i) => (g(t, e, "read from private field"), i ? i.call(t) : e.get(t)), v = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, $ = (t, e, i, s) => (g(t, e, "write to private field"), s ? s.call(t, i) : e.set(t, i), i), E = (t, e, i) => (g(t, e, "access private method"), i), o, h, b;
let n = class extends f(_) {
  constructor() {
    super(), v(this, h), v(this, o, void 0), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(x, (t) => {
      const e = t;
      this.observe(e.unique, (i) => {
        this._documentUnique = i;
      });
    }), this.consumeContext(C, (t) => {
      $(this, o, t);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), p(this, o) != null && this._documentUnique && (this.pageData = await p(this, o).getPageData(this._documentUnique));
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (this.pageData = await ((t = p(this, o)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.waiting = !1);
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
      (a) => E(this, h, b).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating slot="header" .carbonRating=${(e = this.pageData) == null ? void 0 : e.carbonRating}></sustainability-carbon-rating>
                <p><strong>Last tested:</strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((i = this.pageData) == null ? void 0 : i.lastRunDate))}</p>
                <uui-button label="Run again" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                  Run again
                </uui-button>
              </uui-box>
              <uui-box headline="Page size">
                ${(this.pageData.totalSize / 1024).toFixed(2)}KB
              </uui-box>
              <uui-box headline="CO₂ per page view">
                ${(s = this.pageData) == null ? void 0 : s.totalEmissions.toFixed(4)}g
              </uui-box>
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
h = /* @__PURE__ */ new WeakSet();
b = function(t) {
  var e;
  if (((e = t.resources) == null ? void 0 : e.length) !== 0)
    return r`
          <uui-box headline=${t.name}>
            <ul>
            ${m(
      t.resources,
      (i) => i.url,
      (i) => r`<li>${i.url} (${(i.size / 1024).toFixed(2)}KB)</li>`
    )}
            </ul>
          </uui-box>
        `;
};
n.styles = y`
        :host {
            display: grid;
            gap: var(--uui-size-layout-1);
            padding: var(--uui-size-layout-1);
            grid-template-columns: 1fr 350px;
        }

        div.container {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-layout-1);
        }
    `;
u([
  d()
], n.prototype, "_documentUnique", 2);
u([
  d()
], n.prototype, "waiting", 2);
u([
  d()
], n.prototype, "pageData", 2);
n = u([
  w("sustainability-workspace-view")
], n);
const U = n;
export {
  n as SustainabilityWorkspaceElement,
  U as default
};
//# sourceMappingURL=sustainability-workspace-view-CugZz0fY.js.map
