/**
 * Function will create a list of wrapper blocks present in a selection.
 */
import { NodeType } from "prosemirror-model"
import { EditorState } from "prosemirror-state"

export function getSelectedWrapperNodes(state: EditorState): NodeType[] {
    const nodes: Array<NodeType> = [];
    if (state.selection) {
        const { $from, $to } = state.selection;
        const {
            blockquote,
            panel,
            orderedList,
            bulletList,
            listItem,
            codeBlock,
        } = state.schema.nodes;
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (
                (node.isBlock &&
                    [blockquote, panel, orderedList, bulletList, listItem].indexOf(
                        node.type,
                    ) >= 0) ||
                node.type === codeBlock
            ) {
                nodes.push(node.type);
            }
        });
    }
    return nodes;
}
