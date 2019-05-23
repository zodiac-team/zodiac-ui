import { Command } from "../../editor/interfaces"
import { Node } from "prosemirror-model"
import { Selection } from "prosemirror-state"

export interface UpdateNodeOptions {
    node: Node
    selection: Selection
    value: any
}

export interface EditNodeOptions {
    node: Node
    selection: Selection
}

export const updateNode: (options: UpdateNodeOptions) => Command = options => (state, dispatch) => {
    if (!options.node) {
        return false
    }

    if (dispatch) {
        const tr = state.tr.setNodeMarkup(options.selection.anchor, options.node.type, {
            ...options.node.attrs,
            ...options.value,
        })

        dispatch(tr)
    }

    return true
}

export const editNode: (options: EditNodeOptions) => Command = options => (state, dispatch) => {
    return true
}
