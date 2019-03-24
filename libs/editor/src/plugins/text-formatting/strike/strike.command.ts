import { toggleMark } from "prosemirror-commands"
import { Command } from "../../../lib/interfaces/command"

export const toggleStrike = (): Command => {
    return (state, dispatch) => {
        const { strike } = state.schema.marks;
        if (strike) {
            return toggleMark(strike)(state, dispatch);
        }
        return false;
    };
};
