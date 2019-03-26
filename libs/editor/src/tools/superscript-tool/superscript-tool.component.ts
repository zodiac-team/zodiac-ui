import { ChangeDetectionStrategy, Component } from "@angular/core"
import { toggleSuperscript } from "../../plugins/text-formatting/subsup/subsup.command"
import { isMarkActive } from "../../plugins/text-formatting/utils"
import { toggleMark } from "prosemirror-commands"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"

@Component({
    selector: "z-superscript-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./superscript-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperscriptToolComponent {
    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Toggle Superscript",
            icon: "format_size",
            run: toggleSuperscript(),
            active(state) {
                const { subsup } = state.schema.marks
                if (subsup) {
                    return isMarkActive(state, subsup.create({ type: "sup" }))
                }
                return false
            },
            enable(state) {
                const { subsup } = state.schema.marks
                if (subsup) {
                    return toggleMark(subsup, { type: "sup" })(state)
                }
                return false
            },
        }
    }
}
