import { Command } from "../interfaces/command"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"

export type Predicate = (state: EditorState, view?: EditorView) => boolean;

export const filterCommands = (predicates: Predicate[] | Predicate, cmd: Command): Command => {
    return function(state, dispatch, view): boolean {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }

        if (predicates.some(pred => !pred(state, view))) {
            return false;
        }

        return cmd(state, dispatch, view) || false;
    };
};
