import { toggleMark } from "prosemirror-commands"
import { Command } from "../../../lib/interfaces/command"
import { isMarkActive } from "../utils"

export const toggleSubscript = (): Command => {
    return (state, dispatch) => {
        const { subsup } = state.schema.marks;
        if (subsup) {
            if (isMarkActive(state, subsup.create({ type: 'sup' }))) {
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sub' })(state, dispatch);
        }
        return false;
    };
};

export const toggleSuperscript = (): Command => {
    return (state, dispatch) => {
        const { subsup } = state.schema.marks;
        if (subsup) {
            if (isMarkActive(state, subsup.create({ type: 'sub' }))) {
                // If subscript is enabled, turn it off first.
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sup' })(state, dispatch);
        }
        return false;
    };
};

