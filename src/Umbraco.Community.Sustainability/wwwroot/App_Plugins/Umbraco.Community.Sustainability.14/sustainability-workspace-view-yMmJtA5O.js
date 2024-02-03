import { UmbElementMixin as p } from "@umbraco-cms/backoffice/element-api";
import { LitElement as m, html as u, css as b, state as c, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as h } from "@umbraco-cms/backoffice/workspace";
var x = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (i, t, s, r) => {
  for (var e = r > 1 ? void 0 : r ? f(t, s) : t, a = i.length - 1, n; a >= 0; a--)
    (n = i[a]) && (e = (r ? n(t, s, e) : n(e)) || e);
  return r && e && x(t, s, e), e;
};
let o = class extends p(m) {
  constructor() {
    super(), this.pageName = "", this.loading = !0, this.consumeContext(h, (i) => {
      const t = i;
      console.log(t.getName()), this.pageName = t.getName();
    });
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
o.styles = b`
        uui-box {
            margin: 24px;
        }
    `;
l([
  c()
], o.prototype, "pageName", 2);
o = l([
  g("sustainability-workspace-view")
], o);
const E = o;
export {
  o as SustainabilityWorkspaceElement,
  E as default
};
//# sourceMappingURL=sustainability-workspace-view-yMmJtA5O.js.map
