import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { LitElement as f, html as u, css as d, state as v, property as c, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as y } from "@umbraco-cms/backoffice/workspace";
import { SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN as C } from "./sustainability.context-_VZdRj2b.js";
import "@umbraco-cms/backoffice/class-api";
import "@umbraco-cms/backoffice/resources";
import "@umbraco-cms/backoffice/context-api";
import "@umbraco-cms/backoffice/auth";
import "@umbraco-cms/backoffice/observable-api";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, s = (e, t, a, i) => {
  for (var o = i > 1 ? void 0 : i ? E(t, a) : t, p = e.length - 1, l; p >= 0; p--)
    (l = e[p]) && (o = (i ? l(t, a, o) : l(o)) || o);
  return i && o && x(t, a, o), o;
}, m = (e, t, a) => {
  if (!t.has(e))
    throw TypeError("Cannot " + a);
}, h = (e, t, a) => (m(e, t, "read from private field"), a ? a.call(e) : t.get(e)), b = (e, t, a) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, a);
}, N = (e, t, a, i) => (m(e, t, "write to private field"), i ? i.call(e, a) : t.set(e, a), a), n;
let r = class extends g(f) {
  constructor() {
    super(), b(this, n, void 0), this.pageName = "", this.loading = !0, this.consumeContext(y, (e) => {
      const t = e;
      console.log(t.getName()), this.pageName = t.getName();
    }), this.consumeContext(C, (e) => {
      N(this, n, e), this.observe(e.pageData, (t) => {
        this.pageData = t, this.pageData != null && this.pageData !== "unknown" && (this.loading = !1);
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), h(this, n) != null && this.loading && h(this, n).getPageData(0);
  }
  render() {
    return this.loading ? u`
              <uui-box headline="Loading sustainability report...">
                  <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
                  <uui-button look="primary">
                    Run sustainability report
                  </uui-button>
              </uui-box>
          ` : u`
            <uui-box>
            </uui-box>
          `;
  }
};
n = /* @__PURE__ */ new WeakMap();
r.styles = d`
        uui-box {
            margin: 24px;
        }
    `;
s([
  v()
], r.prototype, "pageName", 2);
s([
  c({ type: Boolean })
], r.prototype, "loading", 2);
s([
  c({ type: String })
], r.prototype, "pageData", 2);
r = s([
  _("sustainability-workspace-view")
], r);
const W = r;
export {
  r as SustainabilityWorkspaceElement,
  W as default
};
//# sourceMappingURL=sustainability-workspace-view-_gtAFcVK.js.map
