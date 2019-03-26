import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { headingNode } from "./heading.node"

export const HEADING = "heading"

export const headingPlugin: EditorPlugin = {
    name: HEADING,

    nodes() {
        return [{
            name: HEADING,
            node: headingNode
        }]
    },
}
