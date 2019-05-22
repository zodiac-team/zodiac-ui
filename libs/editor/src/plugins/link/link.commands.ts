import { EditorState, Selection } from "prosemirror-state"
import { Mark, Node } from "prosemirror-model"
import { filterCommands, Predicate } from "../../lib/utils/filter"
import { Command } from "../../lib/interfaces/command"
import { normalizeUrl } from "./utils"
import { canLinkBeCreatedInRange, LinkAction, pluginKey } from "./pm/hyperlink"
import { INPUT_METHOD } from "../block-type/keymap"

export function isTextAtPos(pos: number): Predicate {
    return (state: EditorState) => {
        const node = state.doc.nodeAt(pos)
        return !!node && node.isText
    }
}

export function isLinkAtPos(pos: number): Predicate {
    return (state: EditorState) => {
        const node = state.doc.nodeAt(pos)
        return !!node && state.schema.marks.link.isInSet(node.marks)
    }
}

export function setLinkHref(href: string, pos: number, to?: number): Command {
    return filterCommands(isTextAtPos(pos), (state, dispatch) => {
        const $pos = state.doc.resolve(pos)
        const node = state.doc.nodeAt(pos) as Node
        const linkMark = state.schema.marks.link
        const mark = linkMark.isInSet(node.marks) as Mark | undefined
        const url = normalizeUrl(href)
        if (mark && mark.attrs.href === url) {
            return false
        }

        const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize

        const tr = state.tr.removeMark(pos, rightBound, linkMark)

        if (href.trim()) {
            tr.addMark(
                pos,
                rightBound,
                linkMark.create({
                    ...((mark && mark.attrs) || {}),
                    href: url,
                }),
            )
            tr.setMeta(pluginKey, LinkAction.HIDE_TOOLBAR)
        }

        if (dispatch) {
            dispatch(tr)
        }
        return true
    })
}

export function setLinkText(text: string, pos: number, to?: number): Command {
    return filterCommands(isLinkAtPos(pos), (state, dispatch) => {
        const $pos = state.doc.resolve(pos)
        const node = state.doc.nodeAt(pos) as Node
        const mark = state.schema.marks.link.isInSet(node.marks) as Mark
        if (node && text.length > 0 && text !== node.text) {
            const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize
            const tr = state.tr

            tr.insertText(text, pos, rightBound)
            tr.addMark(pos, pos + text.length, mark)
            tr.setMeta(pluginKey, LinkAction.HIDE_TOOLBAR)

            if (dispatch) {
                dispatch(tr)
            }
            return true
        }
        return false
    })
}

export function insertLink(from: number, to: number, href: string, text?: string): Command {
    return filterCommands(canLinkBeCreatedInRange(from, to), (state, dispatch) => {
        const link = state.schema.marks.link
        if (href.trim()) {
            const { tr } = state
            if (from === to) {
                const textContent = text || href
                tr.insertText(textContent, from, to)
                tr.addMark(
                    from,
                    from + textContent.length,
                    link.create({ href: normalizeUrl(href) }),
                )
            } else {
                tr.addMark(from, to, link.create({ href: normalizeUrl(href) }))
                tr.setSelection(Selection.near(tr.doc.resolve(to)))
            }

            // queueCardsFromChangedTr(state, tr);

            if (dispatch) {
                tr.setMeta(pluginKey, LinkAction.HIDE_TOOLBAR)
                dispatch(tr)
            }
            return true
        }
        return false
    })
}

export function removeLink(pos: number): Command {
    return setLinkHref("", pos)
}

export function showLinkToolbar(
    inputMethod:
        | INPUT_METHOD.TOOLBAR
        | INPUT_METHOD.QUICK_INSERT
        | INPUT_METHOD.SHORTCUT = INPUT_METHOD.TOOLBAR,
): Command {
    return function(state, dispatch) {
        if (dispatch) {
            const tr = state.tr.setMeta(pluginKey, LinkAction.SHOW_INSERT_TOOLBAR)
            dispatch(tr)
        }
        return true
    }
}

export function hideLinkToolbar(): Command {
    return function(state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(pluginKey, LinkAction.HIDE_TOOLBAR))
        }
        return true
    }
}
