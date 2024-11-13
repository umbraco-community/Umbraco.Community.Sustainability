import { html as a, state as m, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as c } from "@umbraco-cms/backoffice/lit-element";
var _ = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (n, e, s, r) => {
  for (var t = r > 1 ? void 0 : r ? f(e, s) : e, i = n.length - 1, u; i >= 0; i--)
    (u = n[i]) && (t = (r ? u(e, s, t) : u(t)) || t);
  return r && t && _(e, s, t), t;
};
let o = class extends c {
  constructor() {
    super(), this._routes = [
      {
        path: "",
        redirectTo: "../workspace/overview-root"
      }
    ];
  }
  render() {
    if (this._routes)
      return a`<umb-router-slot id="router-slot" .routes=${this._routes}></umb-router-slot>`;
  }
};
l([
  m()
], o.prototype, "_routes", 2);
o = l([
  p("sustainability-section-view")
], o);
const w = o;
export {
  o as SustainabilitySectionViewElement,
  w as default
};
//# sourceMappingURL=sustainability-section-view.element-BJV2vtve.js.map
