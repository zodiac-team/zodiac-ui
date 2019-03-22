import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { hardBreakNode } from "./hard-break.node"
import { PMPluginFactory } from "../../lib/interfaces/editor-config"
import { keymap } from "prosemirror-keymap"
import { bindKeymapWithCommand } from "../../lib/keymaps/keymap"
import { insertNewLine } from "./hard-break.command"

export const HARD_BREAK = "hardBreak"
export const HARD_BREAK_KEYMAP = "hardBreakKeymap"

const hardBreakKeymap: PMPluginFactory = () => {
    const list = {}
    bindKeymapWithCommand('Shift-Enter', insertNewLine(), list)
    return keymap(list)
}

export const hardBreakPlugin: EditorPlugin = {
    name: HARD_BREAK,

    nodes() {
        return [{
            name: HARD_BREAK,
            node: hardBreakNode
        }]
    },

    pmPlugins() {
        return [{
            name: HARD_BREAK_KEYMAP,
            plugin: hardBreakKeymap
        }]
    }
}
