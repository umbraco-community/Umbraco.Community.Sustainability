import { LitElement, css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

const elementName = "sustainability-stats-root-workspace";

@customElement(elementName)
export class SustainabilityStatsRootWorkspaceElement extends UmbElementMixin(LitElement) {

  constructor() {
    super();
  }

  render() {
    return html`
    <umb-workspace-editor
      alias="Umb.Workspace.SustainabilityStats"
      headline="Stats"
      .enforceNoFooter=${true}>
      <div id="content">
        <uui-box>
          <uui-table>
          </uui-table>
        </uui-box>
      </div>
    </umb-workspace-editor>`;
  }

  static styles = [
    UmbTextStyles,
    css`
      #content {
        padding: var(--uui-size-layout-1);
      }
    `
  ]
}

export default SustainabilityStatsRootWorkspaceElement;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: SustainabilityStatsRootWorkspaceElement;
  }
}
