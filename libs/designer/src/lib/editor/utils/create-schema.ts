import { Dictionary } from "../../interfaces"
import { MarkSpec, NodeSpec, Schema } from "prosemirror-model"

export function createSchema(
    nodes: Dictionary<NodeSpec>,
    marks: Dictionary<MarkSpec>,
    topNode: string,
): Schema {
    return new Schema({
        nodes,
        marks,
        topNode,
    })
}
