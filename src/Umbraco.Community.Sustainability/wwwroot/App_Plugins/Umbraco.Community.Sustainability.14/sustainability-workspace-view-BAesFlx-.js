import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as b, html as r, repeat as m, css as y, state as d, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/workspace";
import { S as k } from "./index-Clx-kk79.js";
var C = Object.defineProperty, D = Object.getOwnPropertyDescriptor, u = (t, e, i, n) => {
  for (var a = n > 1 ? void 0 : n ? D(e, i) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (a = (n ? c(e, i, a) : c(a)) || a);
  return n && a && C(e, i, a), a;
}, g = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, p = (t, e, i) => (g(t, e, "read from private field"), i ? i.call(t) : e.get(t)), v = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, $ = (t, e, i, n) => (g(t, e, "write to private field"), n ? n.call(t, i) : e.set(t, i), i), S = (t, e, i) => (g(t, e, "access private method"), i), o, h, f;
let s = class extends _(b) {
  constructor() {
    super(), v(this, h), v(this, o, void 0), this._documentUnique = "", this.waiting = !1, this.pageData = void 0, this.consumeContext(x, (t) => {
      const e = t;
      this.observe(e.unique, (i) => {
        this._documentUnique = i;
      });
    }), this.consumeContext(k, (t) => {
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
    var t, e, i, n;
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
      (a) => S(this, h, f).call(this, a)
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
                ${(n = this.pageData) == null ? void 0 : n.totalEmissions.toFixed(4)}g
              </uui-box>
            </div>
          `;
  }
};
o = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
f = function(t) {
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
s.styles = y`
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
], s.prototype, "_documentUnique", 2);
u([
  d()
], s.prototype, "waiting", 2);
u([
  d()
], s.prototype, "pageData", 2);
s = u([
  w("sustainability-workspace-view")
], s);
const T = s;
export {
  s as SustainabilityWorkspaceElement,
  T as default
};
//# sourceMappingURL=sustainability-workspace-view-BAesFlx-.js.map
