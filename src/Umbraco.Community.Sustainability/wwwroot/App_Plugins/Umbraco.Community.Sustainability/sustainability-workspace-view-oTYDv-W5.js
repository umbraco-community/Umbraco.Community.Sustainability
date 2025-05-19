import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
import { LitElement as y, html as r, repeat as m, css as x, state as h, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as w } from "@umbraco-cms/backoffice/document";
import { S as C } from "./index-DSCLkLs6.js";
var D = Object.defineProperty, k = Object.getOwnPropertyDescriptor, l = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? k(e, i) : e, u = t.length - 1, p; u >= 0; u--)
    (p = t[u]) && (a = (s ? p(e, i, a) : p(a)) || a);
  return s && a && D(e, i, a), a;
}, g = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, c = (t, e, i) => (g(t, e, "read from private field"), i ? i.call(t) : e.get(t)), v = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, $ = (t, e, i, s) => (g(t, e, "write to private field"), s ? s.call(t, i) : e.set(t, i), i), S = (t, e, i) => (g(t, e, "access private method"), i), o, d, f;
let n = class extends b(y) {
  constructor() {
    super(), v(this, d), v(this, o, void 0), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(w, (t) => {
      this.observe(t.unique, (e) => {
        this._documentUnique = e == null ? void 0 : e.toString();
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
      (a) => S(this, d, f).call(this, a)
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
o = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
f = function(t) {
  var e;
  if (((e = t.resources) == null ? void 0 : e.length) !== 0)
    return r`
          <uui-box headline=${t.name}>
          <p slot="header-actions" style="margin: 0">Total size: ${(t.totalSize / 1024).toFixed(2)}KB</p>
            <ul style="margin: 0; padding-left: var(--uui-size-layout-1);">
            ${m(
      t.resources,
      (i) => i.url,
      (i) => r`<li>${i.url} (${((i == null ? void 0 : i.size) / 1024).toFixed(2)}KB)</li>`
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
l([
  h()
], n.prototype, "_documentUnique", 2);
l([
  h()
], n.prototype, "waiting", 2);
l([
  h()
], n.prototype, "pageData", 2);
n = l([
  _("sustainability-workspace-view")
], n);
const z = n;
export {
  n as SustainabilityWorkspaceElement,
  z as default
};
//# sourceMappingURL=sustainability-workspace-view-oTYDv-W5.js.map
