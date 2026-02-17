import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { customElement, html, property } from "@umbraco-cms/backoffice/external/lit";
import { UUIInterfaceColor } from "@umbraco-cms/backoffice/external/uui";

const elementName = "sustainability-carbon-rating";

@customElement(elementName)
export class SustainabilityCarbonRating extends UmbLitElement {

  @property({type: String}) 
  carbonRating: string | null | undefined = undefined;

  _getColour(carbonRating: string | null | undefined): UUIInterfaceColor {
    if (carbonRating == "E" || carbonRating == "F") {
      return "danger";
    }
    else if (carbonRating == "D") {
      return "warning";
    }
    else return "positive";
  }

  render() {
    return html`
    <uui-tag .color=${this._getColour(this.carbonRating)}>
      ${this.carbonRating}
    </uui-tag>
    `
  }
}

export default SustainabilityCarbonRating;

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: SustainabilityCarbonRating;
  }
}
