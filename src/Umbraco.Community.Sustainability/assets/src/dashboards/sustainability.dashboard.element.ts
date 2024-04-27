import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UmbRoute } from "@umbraco-cms/backoffice/router";

const elementName = "sustainability-overview-dashboard";

@customElement(elementName)
export class SustainabilityOverviewDashboardElement extends UmbElementMixin(LitElement) {
  @state()
  private _routes: UmbRoute[] = [
    {
      path: '',
      component: () => import('./views/sustainability-overview.element')
    }
  ];

  constructor() {
    super();
  }

  render() {
    return html`<umb-router-slot .routes=${this._routes}></umb-router-slot>`;
  }
}

export default SustainabilityOverviewDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: SustainabilityOverviewDashboardElement
  }
}