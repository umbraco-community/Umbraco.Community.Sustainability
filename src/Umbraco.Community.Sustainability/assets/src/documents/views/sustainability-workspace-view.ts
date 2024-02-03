import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement, customElement, css, state, property } from '@umbraco-cms/backoffice/external/lit'
import { UMB_WORKSPACE_CONTEXT, UmbVariantableWorkspaceContextInterface } from "@umbraco-cms/backoffice/workspace";
import SustainabilityManagementContext, { SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN } from "../../context/sustainability.context";

@customElement('sustainability-workspace-view')
export class SustainabilityWorkspaceElement extends UmbElementMixin(LitElement) {

    #sustainabilityContext?: SustainabilityManagementContext;

    @state()
    pageName?: string = '';

    @property({type: Boolean})
    loading?: boolean = true;

    @property({type: String})
    pageData?: string;

    constructor() {
        super();

        this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {
            const variantContext = (nodeContext as UmbVariantableWorkspaceContextInterface);
            console.log(variantContext.getName());
            
            this.pageName = variantContext.getName();

        });

        this.consumeContext(SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN, (_instance) => {
          this.#sustainabilityContext = _instance;

          this.observe(_instance.pageData, (_pageData) => {
            this.pageData = _pageData;
            if (this.pageData != null) {
              if (this.pageData !== "unknown") {
                this.loading = false;
              }
            }
          })
        })
    }

    connectedCallback(): void {
      super.connectedCallback();

      if (this.#sustainabilityContext != null) {
        if (this.loading) {
          this.#sustainabilityContext.getPageData(0);
        }
      }
    }

    render() {
        if (this.loading) {
          return html`
              <uui-box headline="Loading sustainability report...">
                  <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
                  <uui-button look="primary">
                    Run sustainability report
                  </uui-button>
              </uui-box>
          `;
        }
        else {
          return html`
            <uui-box>
            </uui-box>
          `;
        }
    }

    static styles = css`
        uui-box {
            margin: 24px;
        }
    `
}

export default SustainabilityWorkspaceElement;
