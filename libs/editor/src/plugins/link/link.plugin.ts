import { link } from "./link.mark"
import { createInputRulePlugin } from "./pm/input-rule"
import { plugin } from "./pm/hyperlink"
import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { createKeymapPlugin } from "./pm/keymap"
import { ComponentFactoryResolver } from "@angular/core"
import { fakeCursorToolbarPlugin } from "./pm/fake-cursor-for-toolbar"

export function hyperlinkPlugin(componentFactoryResolver: ComponentFactoryResolver): EditorPlugin {
    return {
        marks() {
            return [{ name: "link", mark: link }]
        },

        pmPlugins() {
            return [
                {
                    name: "hyperlink",
                    plugin: ({ dispatch }) => plugin(dispatch, componentFactoryResolver),
                },
                {
                    name: "fakeCursorToolbarPlugin",
                    plugin: () => fakeCursorToolbarPlugin,
                },
                {
                    name: "hyperlinkInputRule",
                    plugin: ({ schema }) => {
                        return createInputRulePlugin(schema)
                    },
                },
                {
                    name: "hyperlinkKeymap",
                    plugin: ({ schema }) => createKeymapPlugin(schema),
                },
            ]
        },
    }
}
