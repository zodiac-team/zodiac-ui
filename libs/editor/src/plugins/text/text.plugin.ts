import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { textNode } from "./text.node"

export const TEXT = "text"

export const textPlugin: EditorPlugin = {
    name: TEXT,

    nodes() {
        return [{
            name: TEXT,
            node: textNode
        }]
    }
}
