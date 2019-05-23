import { toggleMark } from "prosemirror-commands"
import { Command } from "../../../lib/interfaces/command"

export const toggleEm = (): Command => {
    return (state, dispatch) => {
        const { em } = state.schema.marks
        if (em) {
            return toggleMark(em)(state, dispatch)
        }
        return false
    }
}
