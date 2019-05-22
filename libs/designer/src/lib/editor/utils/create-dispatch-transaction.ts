import { PluginKey, Transaction } from "prosemirror-state"
import { Node } from "prosemirror-model"
import {
    findChangedNodesFromTransaction,
    validateNodes,
} from "../../../../../editor/src/lib/utils/nodes"
import { Editor } from "../interfaces"
import { Dispatch, EventDispatcher } from "../../../../../editor/src/lib/interfaces/editor-config"

export function createDispatchTransaction(editor: Editor) {
    return (transaction: Transaction) => {
        const nodes: Node[] = findChangedNodesFromTransaction(transaction)

        if (validateNodes(nodes)) {
            // go ahead and update the state now we know the transaction is good
            const editorState = editor.view.state.apply(transaction)
            editor.view.updateState(editorState)
            if (transaction.docChanged) {
                editor.viewChange.next(editor)
            }
            editor.state = editorState
            editor.stateChange.next(editor)
        }
    }
}

export function createDispatch<T>(eventDispatcher: EventDispatcher<T>): Dispatch<T> {
    return (eventName: PluginKey | string, data: T) => {
        if (!eventName) {
            throw new Error("event name is required!")
        }

        const event =
            typeof eventName === "string"
                ? eventName
                : (eventName as PluginKey & { key: string }).key
        eventDispatcher.emit(event, data)
    }
}
