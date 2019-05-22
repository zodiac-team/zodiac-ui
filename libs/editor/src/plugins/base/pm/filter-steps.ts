import { Step } from "prosemirror-transform"
import { Plugin, Transaction } from "prosemirror-state"

const hasInvalidSteps = (tr: Transaction) =>
    ((tr.steps || []) as (Step & { from: number; to: number })[]).some(step => step.from > step.to)

export const filterStepsPlugin = () => {
    return new Plugin({
        filterTransaction(tr) {
            if (hasInvalidSteps(tr)) {
                // tslint:disable-next-line:no-console
                console.warn(
                    "The transaction was blocked because it contains invalid steps",
                    tr.steps,
                )
                return false
            }

            return true
        },
    })
}
