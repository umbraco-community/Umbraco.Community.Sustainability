import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { LitElement as b, html as u, repeat as v, css as _, state as w, property as d, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as k } from "@umbraco-cms/backoffice/workspace";
import { S as C } from "./index-DJ7ZKaCL.js";
var D = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, r = (t, e, i, n) => {
  for (var a = n > 1 ? void 0 : n ? $(e, i) : e, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (a = (n ? p(e, i, a) : p(a)) || a);
  return n && a && D(e, i, a), a;
}, g = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, c = (t, e, i) => (g(t, e, "read from private field"), i ? i.call(t) : e.get(t)), f = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, S = (t, e, i, n) => (g(t, e, "write to private field"), n ? n.call(t, i) : e.set(t, i), i), E = (t, e, i) => (g(t, e, "access private method"), i), s, h, m;
let o = class extends y(b) {
  constructor() {
    super(), f(this, h), f(this, s, void 0), this._documentUnique = "", this.loading = !0, this.waiting = !1, this.consumeContext(k, (t) => {
      const e = t;
      this.observe(e.unique, (i) => {
        this._documentUnique = i;
      });
    }), this.consumeContext(C, (t) => {
      S(this, s, t), this.observe(t.pageData, (e) => {
        var i;
        this.pageData = e, this.pageData != null && typeof ((i = this.pageData) == null ? void 0 : i.totalSize) < "u" && (this.loading = !1);
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), c(this, s) != null && this.loading && this._documentUnique && c(this, s).getPageData(this._documentUnique);
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (await ((t = c(this, s)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.waiting = !1);
  }
  render() {
    var t, e, i, n;
    return this.loading ? u`
          <uui-box headline="Loading sustainability report...">
              <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
              <uui-button label="Run sustainability report" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                Run sustainability report
              </uui-button>
          </uui-box>
      ` : u`
            <div class="container">
              ${v(
      (t = this.pageData) == null ? void 0 : t.resourceGroups,
      (a) => a.name,
      (a) => E(this, h, m).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating .carbonRating=${(e = this.pageData) == null ? void 0 : e.carbonRating}></sustainability-carbon-rating>
                <p><strong>Last tested:</strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((i = this.pageData) == null ? void 0 : i.lastRunDate))}</p>
                <uui-button label="Run again" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                  Run again
                </uui-button>
              </uui-box>
              <uui-box headline="Page size">
                ${(this.pageData.totalSize / 1024).toFixed(2)}KB
              </uui-box>
              <uui-box headline="CO₂ per page view">
                ${(n = this.pageData) == null ? void 0 : n.totalEmissions.toFixed(4)}g
              </uui-box>
            </div>
          `;
  }
};
s = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
m = function(t) {
  var e;
  if (((e = t.resources) == null ? void 0 : e.length) !== 0)
    return u`
          <uui-box headline=${t.name}>
            <ul>
            ${v(
      t.resources,
      (i) => i.url,
      (i) => u`<li>${i.url} (${(i.size / 1024).toFixed(2)}KB)</li>`
    )}
            </ul>
          </uui-box>
        `;
};
o.styles = _`
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
r([
  w()
], o.prototype, "_documentUnique", 2);
r([
  d({ type: Boolean })
], o.prototype, "loading", 2);
r([
  d({ type: Boolean })
], o.prototype, "waiting", 2);
r([
  d({ type: Object })
], o.prototype, "pageData", 2);
o = r([
  x("sustainability-workspace-view")
], o);
const T = o;
export {
  o as SustainabilityWorkspaceElement,
  T as default
};
//# sourceMappingURL=sustainability-workspace-view-BPSW3RO0.js.map
