import { safeInsert } from "prosemirror-utils"
import { Command } from "../../../editor/interfaces"
import { ImageNodeAttrs } from "../interfaces"

export const insertImage: (options: ImageNodeAttrs) => Command = options => (state, dispatch) => {
    const blockType = state.schema.nodes["img"]
    const mediaNode = blockType.create(options)
    if (!mediaNode) {
        return false
    }

    if (dispatch) {
        dispatch(safeInsert(mediaNode, state.selection.$to.pos)(state.tr))
    }
    return true
}
