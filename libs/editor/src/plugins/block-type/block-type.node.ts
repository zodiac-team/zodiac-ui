import { NodeSpec } from "prosemirror-model"

/**
 * @name text_node
 */
export interface TextDefinition {
    type: "text"
    /**
     * @minLength 1
     */
    text: string
    marks?: Array<any>
}

export const blockTypeNode: NodeSpec & { toDebugString?: () => string } = {
    group: "inline",
    // toDebugString:
    // // @ts-ignore
    //     process.env.NODE_ENV !== 'production' ? undefined : () => 'text_node',
}
