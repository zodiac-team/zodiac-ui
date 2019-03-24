/**
 * Determine if a mark of a specific type exists anywhere in the selection.
 */
import { Mark, MarkType } from "prosemirror-model"
import { EditorState } from "prosemirror-state"

export const isMarkTypeActive = (
    state: EditorState,
    markType: MarkType,
): boolean => {
    const { $from, from, to, empty } = state.selection;
    if (empty) {
        return !!markType.isInSet(state.storedMarks || $from.marks());
    }
    return state.doc.rangeHasMark(from, to, markType);
};

/**
 * Determine if a mark (with specific attribute values) exists anywhere in the selection.
 */
export const isMarkActive = (state: EditorState, mark: Mark): boolean => {
    const { from, to, empty } = state.selection;
    // When the selection is empty, only the active marks apply.
    if (empty) {
        return !!mark.isInSet(
            state.tr.storedMarks || state.selection.$from.marks(),
        );
    }
    // For a non-collapsed selection, the marks on the nodes matter.
    let found = false;
    state.doc.nodesBetween(from, to, node => {
        found = found || mark.isInSet(node.marks);
    });
    return found;
};
