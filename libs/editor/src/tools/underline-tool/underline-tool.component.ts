import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { toggleUnderline } from "../../plugins/text-formatting/underline/underline.command"
import { EditorState } from "prosemirror-state"
import { isMarkTypeActive } from "../../plugins/text-formatting/utils"

@Component({
    selector: "z-underline-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./underline-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnderlineToolComponent {
    @Input()
    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: 'Underline Text',
            icon: 'format_underline',
            run: toggleUnderline(),
            enable(state) {
                return toggleUnderline()(state)
            },
            active(state: EditorState) {
                const { underline } = state.schema.marks
                return isMarkTypeActive(state, underline)
            }
        }
    }
}
