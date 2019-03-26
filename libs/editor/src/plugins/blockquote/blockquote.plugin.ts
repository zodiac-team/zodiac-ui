import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { blockquoteNode } from "./blockquote.node"

export const BLOCKQUOTE = "blockquote"

export const blockquotePlugin: EditorPlugin = {
    name: BLOCKQUOTE,

    nodes() {
        return [{
            name: BLOCKQUOTE,
            node: blockquoteNode
        }]
    }
}
