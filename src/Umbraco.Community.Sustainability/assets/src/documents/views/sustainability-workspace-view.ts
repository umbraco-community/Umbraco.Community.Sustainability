import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement, customElement, css, state } from '@umbraco-cms/backoffice/external/lit'
import { UMB_WORKSPACE_CONTEXT, UmbVariantableWorkspaceContextInterface } from "@umbraco-cms/backoffice/workspace";

@customElement('sustainability-workspace-view')
export class SustainabilityWorkspaceElement extends UmbElementMixin(LitElement) {

    //#workspaceContext? : typeof UMB_WORKSPACE_CONTEXT.TYPE;

    @state()
    pageName?: string = '';
    loading?: boolean = true;

    constructor() {
        super();

        this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {
            const variantContext = (nodeContext as UmbVariantableWorkspaceContextInterface);
            console.log(variantContext.getName());
            
            this.pageName = variantContext.getName();

        });
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
