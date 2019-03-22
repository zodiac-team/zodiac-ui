import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { docNode } from "./doc.node"

export const DOC = "doc"

export const docPlugin: EditorPlugin = {
    name: DOC,

    nodes() {
        return [{
            name: DOC,
            node: docNode
        }]
    }
}
