import { LitElement as u, html as l, css as m, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as p } from "@umbraco-cms/backoffice/style";
import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
var f = Object.defineProperty, d = Object.getOwnPropertyDescriptor, v = (n, e, r, o) => {
  for (var t = o > 1 ? void 0 : o ? d(e, r) : e, a = n.length - 1, i; a >= 0; a--)
    (i = n[a]) && (t = (o ? i(e, r, t) : i(t)) || t);
  return o && t && f(e, r, t), t;
};
const S = "sustainability-stats-root-workspace";
let s = class extends b(u) {
  constructor() {
    super();
  }
  render() {
    return l`
    <umb-workspace-editor
      alias="Umb.Workspace.SustainabilityStats"
      headline="Stats"
      .enforceNoFooter=${!0}>
      <div id="content">
        <uui-box>
          <uui-table>
          </uui-table>
        </uui-box>
      </div>
    </umb-workspace-editor>`;
  }
};
s.styles = [
  p,
  m`
      #content {
        padding: var(--uui-size-layout-1);
      }
    `
];
s = v([
  c(S)
], s);
const w = s;
export {
  s as SustainabilityStatsRootWorkspaceElement,
  w as default
};
//# sourceMappingURL=stats-root-workspace.element-DpmlLM66.js.map
