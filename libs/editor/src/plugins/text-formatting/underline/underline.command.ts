import { toggleMark } from "prosemirror-commands"
import { Command } from "../../../lib/interfaces/command"

export const toggleUnderline = (): Command => {
    return (state, dispatch) => {
        const { underline } = state.schema.marks;
        if (underline) {
            return toggleMark(underline)(state, dispatch);
        }
        return false;
    };
};
