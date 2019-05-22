import { Plugin, Transaction } from "prosemirror-state"
import { findChildrenByMark } from "prosemirror-utils"
import { Node, Mark } from "prosemirror-model"
import { normalizeUrl } from "../utils"

const isHrefAndTextEqual = (node: Node) => {
    const mark = node.type.schema.marks.link.isInSet(node.marks)
    return mark ? mark.attrs.href === normalizeUrl(node.text) : false
}

const isInsideLinkMark = (node?: Node | null) =>
    !!(node && node.type.schema.marks.link.isInSet(node.marks))

// Given the position of a link in an old document, apply the
// transactions to determine the new position of this link.
// If the link was deleted during any transactions, return null
const getLinkPosAfterTransactions = (pos: number, txns: Transaction[]) => {
    let trPos = pos
    for (const tr of txns) {
        trPos = tr.mapping.map(trPos)
        const { nodeAfter, textOffset } = tr.doc.resolve(trPos)
        trPos = trPos - textOffset

        if (!isInsideLinkMark(nodeAfter)) {
            return null
        }
    }
    return trPos
}

/**
 * Ensures that when a link that **used** to have the same text
 * as it's url gets modified, that the url is also updated.
 */
export default new Plugin({
    appendTransaction(txns, oldState, newState) {
        if (txns.some(tr => tr.docChanged)) {
            const {
                tr,
                schema: {
                    marks: { link },
                },
            } = newState
            findChildrenByMark(oldState.doc, link).forEach(item => {
                if (isHrefAndTextEqual(item.node)) {
                    const pos = getLinkPosAfterTransactions(item.pos, txns)
                    if (typeof pos === "number") {
                        const trPos = tr.mapping.map(pos)
                        const node = tr.doc.nodeAt(trPos) as Node
                        if (!isHrefAndTextEqual(node)) {
                            const mark = link.isInSet(node.marks) as Mark
                            tr.removeMark(trPos, trPos + node.nodeSize, mark)
                            tr.addMark(
                                trPos,
                                trPos + node.nodeSize,
                                mark.type.create({ href: normalizeUrl(node.text) }),
                            )
                        }
                    }
                }
            })
            return tr.docChanged ? tr : undefined
        }
    },
})
