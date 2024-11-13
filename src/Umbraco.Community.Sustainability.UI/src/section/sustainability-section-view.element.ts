import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbRoute } from "@umbraco-cms/backoffice/router";

@customElement('sustainability-section-view')
export class SustainabilitySectionViewElement extends UmbLitElement {

  @state()
  private _routes?: UmbRoute[];

  constructor() {
    super();

    this._routes = [
      {
        path: '',
        redirectTo: '../workspace/overview-root'
      }
    ]
  }

  render() {
    if (!this._routes) return;
    return html`<umb-router-slot id="router-slot" .routes=${this._routes}></umb-router-slot>`;
  }
}

export default SustainabilitySectionViewElement;

declare global {
  interface HTMLElementTagNameMap {
    'sustainability-section-view': SustainabilitySectionViewElement;
  }
}
