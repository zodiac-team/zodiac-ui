import { EditorState, Plugin } from "prosemirror-state"
import { Node, Schema } from "prosemirror-model"

export function createState(schema: Schema, nodeOrJson: Node | any, plugins?: Plugin[]) {
    return EditorState.create({
        schema,
        doc: nodeOrJson instanceof Node ? nodeOrJson : Node.fromJSON(schema, nodeOrJson.doc),
        plugins,
    })
}
