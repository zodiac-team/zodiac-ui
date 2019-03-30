import { TextSelection } from "prosemirror-state"
import { Fragment } from "prosemirror-model"
import { Command } from "../../lib/interfaces/command"

export function insertNewLine(): Command {
    return function(state, dispatch) {
        const { $from } = state.selection;
        const parent = $from.parent;
        const { hardBreak } = state.schema.nodes;

        if (hardBreak) {
            const hardBreakNode = hardBreak.create();

            if (parent && parent.type.validContent(Fragment.from(hardBreakNode))) {
                if (dispatch) {
                    dispatch(state.tr.replaceSelectionWith(hardBreakNode));
                }
                return true;
            }
        }

        if (state.selection instanceof TextSelection) {
            if (dispatch) {
                dispatch(state.tr.insertText('\n'));
            }
            return true;
        }

        return false;
    };
}
