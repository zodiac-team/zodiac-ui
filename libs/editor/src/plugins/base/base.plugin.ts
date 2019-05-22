import { baseKeymap } from "prosemirror-commands"
import { history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import { filterStepsPlugin } from "./pm/filter-steps"
import { focusHandlerPlugin } from "./pm/focus-handler"
import { newlinePreserveMarksPlugin } from "./pm/newline-preserve-marks"
import { inlineCursorTargetPlugin } from "./pm/inline-cursor-target"
import { EditorPlugin } from "../../lib/interfaces/editor-plugin"

export const basePlugin: EditorPlugin = {
    pmPlugins() {
        return [
            {
                name: "filterStepsPlugin",
                plugin: () => filterStepsPlugin(),
            },
            {
                name: "inlineCursorTargetPlugin",
                plugin: () => inlineCursorTargetPlugin(),
            },
            {
                name: "focusHandlerPlugin",
                plugin: ({ dispatch }) => focusHandlerPlugin(dispatch),
            },
            {
                name: "newlinePreserveMarksPlugin",
                plugin: newlinePreserveMarksPlugin,
            },
            { name: "history", plugin: () => history() },
            // should be last :(
            {
                name: "codeBlockIndent",
                plugin: () =>
                    keymap({
                        ...baseKeymap,
                        "Mod-[": () => true,
                        "Mod-]": () => true,
                    }),
            },
        ]
    },
}
