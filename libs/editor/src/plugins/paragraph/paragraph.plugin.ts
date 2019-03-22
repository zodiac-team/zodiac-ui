import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { paragraphNode } from "./paragraph.mark"


export const PARAGRAPH = "paragraph"

export const paragraphPlugin: EditorPlugin = {
    name: PARAGRAPH,

    nodes() {
        return [{
            name: PARAGRAPH,
            node: paragraphNode
        }]
    }
}
