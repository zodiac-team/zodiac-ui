import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { showLinkToolbar } from "../../plugins/link/link.commands"
import { INPUT_METHOD } from "../../plugins/block-type/keymap"
import { pluginKey } from "../../plugins/link/pm/hyperlink"

@Component({
    selector: "z-link-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./link-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkToolComponent {
    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Hyperlink",
            icon: "fa-link",
            run: showLinkToolbar(INPUT_METHOD.TOOLBAR),
            active(state) {
                const pluginState = pluginKey.getState(state)
                return pluginState.activeLinkMark
            },
            enable(state) {
                const pluginState = pluginKey.getState(state)
                return pluginState.canInsertLink
            },
        }
    }
}
