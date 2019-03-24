import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { toggleStrong } from "../../plugins/text-formatting/strong/strong.command"
import { EditorState } from "prosemirror-state"
import { isMarkTypeActive } from "../../plugins/text-formatting/utils"

@Component({
    selector: "z-strong-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./strong-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrongToolComponent {

    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Bold Text",
            icon: "format_bold",
            run: toggleStrong(),
            enable(state) {
                return toggleStrong()(state)
            },
            active(state: EditorState) {
                const { strong } = state.schema.marks
                return isMarkTypeActive(state, strong)
            }
        }
    }
}
