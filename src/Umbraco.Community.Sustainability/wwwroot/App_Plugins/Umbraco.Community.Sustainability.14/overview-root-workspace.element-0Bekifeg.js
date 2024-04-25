import { html as m, customElement as s } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
var u = Object.defineProperty, c = Object.getOwnPropertyDescriptor, v = (n, t, l, o) => {
  for (var e = o > 1 ? void 0 : o ? c(t, l) : t, r = n.length - 1, i; r >= 0; r--)
    (i = n[r]) && (e = (o ? i(t, l, e) : i(e)) || e);
  return o && e && u(t, l, e), e;
};
const p = "sustainability-overview-root-workspace";
let a = class extends b {
  render() {
    return m` <umb-body-layout main-no-padding headline="Overview">
			<umb-collection alias="Umb.Collection.Sustainability"></umb-collection>;
		</umb-body-layout>`;
  }
};
a = v([
  s(p)
], a);
export {
  a as SustainabilityOverviewRootWorkspaceElement,
  a as element
};
//# sourceMappingURL=overview-root-workspace.element-0Bekifeg.js.map
