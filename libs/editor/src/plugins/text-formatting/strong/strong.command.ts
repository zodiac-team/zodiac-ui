import { toggleMark } from "prosemirror-commands"
import { Command } from "../../../lib/interfaces/command"

export const toggleStrong = (): Command => {
    return (state, dispatch) => {
        const { strong } = state.schema.marks;
        if (strong) {
            return toggleMark(strong)(state, dispatch);
        }
        return false;
    };
};
