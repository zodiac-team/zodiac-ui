import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"
import { EditorTool } from "../../lib/editor-toolbar/interfaces"
import { toggleStrike } from "../../plugins/text-formatting/strike/strike.command"
import { toggleStrong } from "../../plugins/text-formatting/strong/strong.command"
import { isMarkTypeActive } from "../../plugins/text-formatting/utils"

@Component({
    selector: "z-strike-tool",
    template: `
        <z-editor-toolbar-button [tool]="tool"></z-editor-toolbar-button>
    `,
    styleUrls: ["./strike-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrikeToolComponent implements OnInit {
    public tool: EditorTool

    constructor() {
        this.tool = {
            tooltip: "Toggle Strikthrough",
            icon: 'format_strikethrough',
            run: toggleStrike(),
            enable(state) {
                return toggleStrike()(state)
            },
            active(state) {
                const { strike } = state.schema.marks
                return isMarkTypeActive(state, strike)
            }
        }
    }

    ngOnInit() {}
}
