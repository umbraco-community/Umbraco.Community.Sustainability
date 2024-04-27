import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbRoute } from "@umbraco-cms/backoffice/router";

const elementName = "overview-workspace";

@customElement(elementName)
export class OverviewRootWorkspaceElement extends UmbElementMixin(LitElement) {
  @state()
  private _routes: UmbRoute[] = [
    {
      path: ``,
      component: () => import('../../../dashboards/sustainability.dashboard.element')
    }
  ];

  constructor() {
    super();
  }

  render() {
    return html`<umb-router-slot .routes=${this._routes}></umb-router-slot>`;
  }
}

export default OverviewRootWorkspaceElement;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: OverviewRootWorkspaceElement;
  }
}