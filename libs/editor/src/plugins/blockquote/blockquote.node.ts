import { NodeSpec } from "prosemirror-model"
/**
 * @name blockquote_node
 */
export interface BlockQuoteDefinition {
    type: "blockquote"
    /**
     * @minItems 1
     */
    content: Array<any>
}

export const blockquoteNode: NodeSpec = {
    content: "paragraph+",
    group: "block",
    defining: true,
    selectable: false,
    parseDOM: [{ tag: "blockquote" }],
    toDOM() {
        return ["blockquote", 0]
    },
}
