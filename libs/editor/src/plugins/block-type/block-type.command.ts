import { EditorState, Selection, Transaction } from "prosemirror-state"
import { Node } from "prosemirror-model"
import { mapSlice } from "../../lib/utils/map-slice"
import { Command } from "../../lib/interfaces/command"
import { HeadingLevels, HEADINGS_BY_NAME, NORMAL_TEXT } from "./interfaces"

export function setNormalText(): Command {
    return function(state, dispatch) {
        const {
            tr,
            selection: { $from, $to },
            schema,
        } = state
        if (dispatch) {
            dispatch(tr.setBlockType($from.pos, $to.pos, schema.nodes.paragraph))
        }
        return true
    }
}

export function setHeading(level: number): Command {
    return function(state, dispatch) {
        const {
            tr,
            selection: { $from, $to },
            schema,
        } = state
        if (dispatch) {
            dispatch(tr.setBlockType($from.pos, $to.pos, schema.nodes.heading, { level }))
        }
        return true
    }
}

export function setBlockType(name: string): Command {
    return (state, dispatch) => {
        const { nodes } = state.schema
        if (name === NORMAL_TEXT.name && nodes.paragraph) {
            return setNormalText()(state, dispatch)
        }

        const headingBlockType = HEADINGS_BY_NAME[name]
        if (headingBlockType && nodes.heading && headingBlockType.level) {
            return setHeading(headingBlockType.level as HeadingLevels)(state, dispatch)
        }

        return false
    }
}

export function transformToCodeBlockAction(state: EditorState, attrs?: any): Transaction {
    const codeBlock = state.schema.nodes.codeBlock
    if (state.selection.empty) {
        const startOfCodeBlockText = state.selection.$from
        const parentPos = startOfCodeBlockText.before()
        const end = startOfCodeBlockText.end()

        const slice = mapSlice(state.doc.slice(startOfCodeBlockText.pos, end), node => {
            if (node.type === state.schema.nodes.hardBreak) {
                return state.schema.text("\n")
            }

            if (node.isText) {
                return node.mark([])
            } else if (node.isInline) {
                return node.attrs.text ? state.schema.text(node.attrs.text) : null
            } else {
                return node.content.childCount ? node.content : null
            }
        })

        const tr = state.tr.replaceRange(startOfCodeBlockText.pos, end, slice)
        // If our offset isnt at 3 (backticks) at the start of line, cater for content.
        if (startOfCodeBlockText.parentOffset >= 3) {
            return tr.split(startOfCodeBlockText.pos, undefined, [{ type: codeBlock, attrs }])
        }
        return tr.setNodeMarkup(parentPos, codeBlock, attrs)
    }

    return state.tr
}

export function isConvertableToCodeBlock(state: EditorState): boolean {
    // Before a document is loaded, there is no selection.
    if (!state.selection) {
        return false
    }

    const { $from } = state.selection
    const node = $from.parent

    if (!node.isTextblock || node.type === state.schema.nodes.codeBlock) {
        return false
    }

    const parentDepth = $from.depth - 1
    const parentNode = $from.node(parentDepth)
    const index = $from.index(parentDepth)

    return parentNode.canReplaceWith(index, index + 1, state.schema.nodes.codeBlock)
}

/**
 * Function will insert code block at current selection if block is empty or below current selection and set focus on it.
 */
export function insertCodeBlock(): Command {
    return function(state: EditorState, dispatch) {
        const { tr } = state
        const { $to } = state.selection
        const { codeBlock } = state.schema.nodes

        const getNextNode = state.doc.nodeAt($to.pos + 1)
        const addPos = getNextNode && getNextNode.isText ? 0 : 1

        /** We always want to append a block type */
        tr.replaceRangeWith($to.pos + addPos, $to.pos + addPos, codeBlock.createAndFill() as Node)
        tr.setSelection(Selection.near(tr.doc.resolve(state.selection.to + addPos)))
        if (dispatch) {
            dispatch(tr)
        }
        return true
    }
}
