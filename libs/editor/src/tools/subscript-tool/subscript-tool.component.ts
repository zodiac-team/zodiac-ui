import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { toggleSubscript } from "../../plugins/text-formatting/subsup/subsup.command"
import { isMarkActive } from "../../plugins/text-formatting/utils"
import { toggleMark } from "prosemirror-commands"

@Component({
    selector: "z-subscript-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./subscript-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptToolComponent {

    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Toggle Subscript",
            icon: "text_fields",
            run: toggleSubscript(),
            active(state) {
                const { subsup } = state.schema.marks;
                if (subsup) {
                    return isMarkActive(state, subsup.create({ type: 'sub' }))
                }
                return false
            },
            enable(state) {
                const { subsup } = state.schema.marks;
                if (subsup) {
                    return toggleMark(subsup, { type: 'sub' })(state)
                }
                return false
            }
        }
    }
}
