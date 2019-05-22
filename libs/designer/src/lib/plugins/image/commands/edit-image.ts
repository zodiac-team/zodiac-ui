import { ImageNodeAttrs } from "../interfaces"
import { Command } from "../../../editor/interfaces"
import { findSelectedNodeOfType, replaceSelectedNode } from "prosemirror-utils"

export const editImage: (options: ImageNodeAttrs) => Command = options => (state, dispatch) => {
    const { img } = state.schema.nodes
    const selected = findSelectedNodeOfType(img)(state.tr.selection)

    if (!selected) {
        return false
    }

    if (dispatch) {
        const tr = state.tr.setNodeMarkup(state.selection.anchor, img, { ...options })

        dispatch(tr)
    }

    return true
}
