/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
import { MarkType, NodeType, Schema } from "prosemirror-model"
import { Command } from "../interfaces/command"
import { Node } from "prosemirror-model"

export const toggleBlockMark = <T = object>(
    markType: MarkType,
    getAttrs: (prevAttrs?: T, node?: Node) => T | undefined | false,
    allowedBlocks?: Array<NodeType> | ((schema: Schema, node: Node, parent: Node) => boolean),
): Command => (state, dispatch) => {
    const { from, to } = state.selection

    let markApplied = false
    const tr = state.tr

    state.doc.nodesBetween(from, to, (node, pos, parent) => {
        if (!node.type.isBlock) {
            return false
        }

        if (
            (!allowedBlocks ||
                (Array.isArray(allowedBlocks)
                    ? allowedBlocks.indexOf(node.type) > -1
                    : allowedBlocks(state.schema, node, parent))) &&
            parent.type.allowsMarkType(markType)
        ) {
            const oldMarks = node.marks.filter(mark => mark.type === markType)

            const prevAttrs = oldMarks.length ? (oldMarks[0].attrs as T) : undefined
            const newAttrs = getAttrs(prevAttrs, node)

            if (newAttrs !== undefined) {
                tr.setNodeMarkup(
                    pos,
                    node.type,
                    node.attrs,
                    node.marks
                        .filter(mark => !markType.excludes(mark.type))
                        .concat(newAttrs === false ? [] : markType.create(newAttrs)),
                )
                markApplied = true
            }
        }
    })

    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView())
        }
        return true
    }

    return false
}
