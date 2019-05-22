import { Command } from "../../lib/interfaces/command"

export function insertRule(): Command {
    return function(state, dispatch) {
        const { to } = state.selection
        const { rule } = state.schema.nodes
        if (rule) {
            const ruleNode = rule.create()
            if (dispatch) {
                dispatch(state.tr.insert(to + 1, ruleNode))
            }
            return true
        }
        return false
    }
}
