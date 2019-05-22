/**
 * Finds all top level nodes affected by the transaction
 * Uses from/to positions in transaction's steps to work out which nodes will
 * be changed by the transaction
 */
import { Slice, Node } from "prosemirror-model"
import { Step } from "prosemirror-transform"
import { Transaction } from "prosemirror-state"

export const findChangedNodesFromTransaction = (tr: Transaction): Node[] => {
    const nodes: Node[] = []
    const steps = (tr.steps || []) as (Step & {
        from: number
        to: number
        slice?: Slice
    })[]

    steps.forEach(step => {
        const { to, from, slice } = step
        const size = slice && slice.content ? slice.content.size : 0
        for (let i = from; i <= to + size; i++) {
            if (i <= tr.doc.content.size) {
                const topLevelNode = tr.doc.resolve(i).node(1)
                if (topLevelNode && !nodes.find(n => n === topLevelNode)) {
                    nodes.push(topLevelNode)
                }
            }
        }
    })

    return nodes
}

/** Validates prosemirror nodes, and returns true only if all nodes are valid */
export const validateNodes = (nodes: Node[]): boolean =>
    nodes.every(node => {
        try {
            node.check() // this will throw an error if the node is invalid
        } catch (error) {
            return false
        }
        return true
    })
