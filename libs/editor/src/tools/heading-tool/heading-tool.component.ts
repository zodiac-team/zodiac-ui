import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorToolGroup } from "../../lib/editor-toolbar/interfaces"
import { setBlockType } from "../../plugins/block-type/block-type.command"
import { pluginKey } from "../../plugins/block-type/block-type.plugin"
import { EditorState } from "prosemirror-state"
import { toggleBlockQuote } from "../../lib/keymaps/keymap"
import { insertBlockType } from "../../plugins/block-type/keymap"

const headingLevels = [1, 2, 3, 4, 5, 6]

const blockTypesEnabled = (state: EditorState) => {
    const pluginState = pluginKey.getState(state)
    return pluginState.blockTypesEnabled
}

const currentBlockSelected = (name: string) => (state: EditorState) => {
    const pluginState = pluginKey.getState(state)
    return pluginState.currentBlockType.name === name
}

const headingTools = headingLevels.map(level => ({
    label: `Heading ${level}`,
    run: setBlockType(`heading${level}`),
    enable: blockTypesEnabled,
    select(state) {
        const pluginState = pluginKey.getState(state)
        return level === pluginState.currentBlockType.level
    },
}))

@Component({
    selector: "z-heading-tool",
    template: `
        <z-editor-toolbar-select [group]="group"></z-editor-toolbar-select>
    `,
    styleUrls: ["./heading-tool.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingToolComponent {
    public group: EditorToolGroup

    constructor() {
        this.group = {
            label: "Style",
            tools: [
                {
                    label: "Normal Text",
                    run: setBlockType("normal"),
                    enable: blockTypesEnabled,
                    select: currentBlockSelected("normal"),
                },
                ...headingTools,
            ],
        }
    }
}
