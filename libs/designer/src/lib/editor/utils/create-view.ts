import { EditorView } from "prosemirror-view"
import { EditorState } from "prosemirror-state"

export function createView(mount: HTMLElement, state: EditorState, dispatchTransaction) {
    return new EditorView({ mount }, { state, dispatchTransaction })
}
