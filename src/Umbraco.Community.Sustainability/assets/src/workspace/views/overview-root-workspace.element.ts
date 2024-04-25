import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

const elementName = "sustainability-overview-root-workspace";

@customElement(elementName)
export class SustainabilityOverviewRootWorkspaceElement extends UmbLitElement {
  render() {
    return html` <umb-body-layout main-no-padding headline="Overview">
			<umb-collection alias="Umb.Collection.Sustainability"></umb-collection>;
		</umb-body-layout>`;
  }
}

export { SustainabilityOverviewRootWorkspaceElement as element }

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: SustainabilityOverviewRootWorkspaceElement;
  }
}
