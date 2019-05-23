/**
 * Determine if a mark of a specific type exists anywhere in the selection.
 */
import { Mark, MarkType } from "prosemirror-model"
import { EditorState, Transaction } from "prosemirror-state"
import { TextFormattingState } from "./interfaces"
import { toggleMark } from "prosemirror-commands"
import { Command } from "../../lib/interfaces/command"

export const deepEqual = (obj1, obj2) => {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false
        }
    }
    return true
}

export const hasCode = (state: EditorState, pos: number): boolean => {
    const { code } = state.schema.marks
    const node = pos >= 0 && state.doc.nodeAt(pos)
    if (node) {
        return !!node.marks.filter(mark => mark.type === code).length
    }

    return false
}

export const isMarkTypeActive = (state: EditorState, markType: MarkType): boolean => {
    const { $from, from, to, empty } = state.selection
    if (empty) {
        return !!markType.isInSet(state.storedMarks || $from.marks())
    }
    return state.doc.rangeHasMark(from, to, markType)
}

/**
 * Determine if a mark (with specific attribute values) exists anywhere in the selection.
 */
export const isMarkActive = (state: EditorState, mark: Mark): boolean => {
    const { from, to, empty } = state.selection
    // When the selection is empty, only the active marks apply.
    if (empty) {
        return !!mark.isInSet(state.tr.storedMarks || state.selection.$from.marks())
    }
    // For a non-collapsed selection, the marks on the nodes matter.
    let found = false
    state.doc.nodesBetween(from, to, node => {
        found = found || mark.isInSet(node.marks)
    })
    return found
}

export const getTextFormattingState = (editorState: EditorState): TextFormattingState => {
    const { em, code, strike, strong, subsup, underline } = editorState.schema.marks
    const state: TextFormattingState = {}

    if (code) {
        state.codeActive = isMarkActive(editorState, code.create())
        state.codeDisabled = !toggleMark(code)(editorState)
    }
    if (em) {
        state.emActive = isMarkTypeActive(editorState, em)
        state.emDisabled = state.codeActive ? true : !toggleMark(em)(editorState)
    }
    if (strike) {
        state.strikeActive = isMarkTypeActive(editorState, strike)
        state.strikeDisabled = state.codeActive ? true : !toggleMark(strike)(editorState)
    }
    if (strong) {
        state.strongActive = isMarkTypeActive(editorState, strong)
        state.strongDisabled = state.codeActive ? true : !toggleMark(strong)(editorState)
    }
    if (subsup) {
        const subMark = subsup.create({ type: "sub" })
        const supMark = subsup.create({ type: "sup" })
        state.subscriptActive = isMarkActive(editorState, subMark)
        state.subscriptDisabled = state.codeActive
            ? true
            : !toggleMark(subsup, { type: "sub" })(editorState)
        state.superscriptActive = isMarkActive(editorState, supMark)
        state.superscriptDisabled = state.codeActive
            ? true
            : !toggleMark(subsup, { type: "sup" })(editorState)
    }
    if (underline) {
        state.underlineActive = isMarkTypeActive(editorState, underline)
        state.underlineDisabled = state.codeActive ? true : !toggleMark(underline)(editorState)
    }
    return state
}

const applyCodeBlock = (from: number, to: number, tr: Transaction): void => {
    const { schema } = tr.doc.type

    if (schema.marks.code) {
        const codeMark = schema.marks.code.create()
        tr.addMark(tr.mapping.map(from), tr.mapping.map(to), codeMark).setStoredMarks([codeMark])
    }
}

export function transformToCodeAction(from: number, to: number, tr: Transaction): Transaction {
    // transformSmartCharsMentionsAndEmojis(from, to, tr);

    applyCodeBlock(from, to, tr)

    return tr
}

export const createInlineCodeFromTextInput = (from: number, to: number, text: string): Command => {
    return (state, dispatch) => {
        if (state.selection.empty) {
            const { nodeBefore: before } = state.doc.resolve(from)
            const { nodeAfter: after } = state.doc.resolve(to)

            const hasTickBefore = before && before.text && before.text.endsWith("`")
            const hasTickAfter = after && after.text && after.text.startsWith("`")
            const tr = state.tr.replaceRangeWith(from - 1, to + 1, state.schema.text(text))

            if (dispatch) {
                dispatch(
                    transformToCodeAction(tr.mapping.map(from - 1), tr.mapping.map(to + 1), tr),
                )
            }
            return true
        }
        return false
    }
}
