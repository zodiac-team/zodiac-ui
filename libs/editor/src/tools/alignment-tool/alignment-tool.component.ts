import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorToolGroup } from "../../lib/editor-toolbar/interfaces"
import { changeAlignment } from "../../plugins/alignment/alignment.command"
import { getActiveAlignment } from "../../plugins/alignment/utils"

@Component({
    selector: "z-alignment-tool",
    template: `
        <z-editor-toolbar-dropdown [group]="group"></z-editor-toolbar-dropdown>
    `,
    styleUrls: ["./alignment-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignmentToolComponent {

    public group: EditorToolGroup

    constructor() {
        this.group = {
            tooltip: "Alignment",
            icon: "format_align_left",
            tools: [{
                tooltip: "Align Left",
                icon: "format_align_left",
                run: changeAlignment("start"),
                active(state) {
                    return getActiveAlignment(state) === "start"
                },
                select(state) {
                    return getActiveAlignment(state) === "start"
                }
            },{
                tooltip: "Align Center",
                icon: "format_align_center",
                run: changeAlignment("center"),
                active(state) {
                    return getActiveAlignment(state) === "center"
                },
                select(state) {
                    return getActiveAlignment(state) === "center"
                }
            },{
                tooltip: "Align Right",
                icon: "format_align_right",
                run: changeAlignment("end"),
                active(state) {
                    return getActiveAlignment(state) === "end"
                },
                select(state) {
                    return getActiveAlignment(state) === "end"
                }
            }]
        }
    }
}
