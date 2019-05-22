import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { EditorState } from "prosemirror-state"
import { isMarkTypeActive } from "../../plugins/text-formatting/utils"
import { toggleEm } from "../../plugins/text-formatting/emphasis/emphasis.command"

@Component({
    selector: "z-emphasis-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./emphasis-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmphasisToolComponent {
    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Italic Text",
            icon: "fa-italic",
            run: toggleEm(),
            enable(state) {
                return toggleEm()(state)
            },
            active(state: EditorState) {
                const { em } = state.schema.marks
                return isMarkTypeActive(state, em)
            },
        }
    }
}
