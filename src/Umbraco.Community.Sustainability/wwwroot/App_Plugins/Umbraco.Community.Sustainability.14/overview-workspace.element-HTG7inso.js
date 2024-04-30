import { UmbElementMixin as u } from "@umbraco-cms/backoffice/element-api";
import { LitElement as c, html as v, state as i, customElement as a } from "@umbraco-cms/backoffice/external/lit";
var _ = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (p, t, s, r) => {
  for (var e = r > 1 ? void 0 : r ? f(t, s) : t, m = p.length - 1, n; m >= 0; m--)
    (n = p[m]) && (e = (r ? n(t, s, e) : n(e)) || e);
  return r && e && _(t, s, e), e;
};
const w = "overview-workspace";
let o = class extends u(c) {
  constructor() {
    super(), this._routes = [
      {
        path: "",
        component: () => import("./sustainability.dashboard.element-DPveSl2O.js")
      }
    ];
  }
  render() {
    return v`<umb-router-slot .routes=${this._routes}></umb-router-slot>`;
  }
};
l([
  i()
], o.prototype, "_routes", 2);
o = l([
  a(w)
], o);
const h = o;
export {
  o as OverviewRootWorkspaceElement,
  h as default
};
//# sourceMappingURL=overview-workspace.element-HTG7inso.js.map
