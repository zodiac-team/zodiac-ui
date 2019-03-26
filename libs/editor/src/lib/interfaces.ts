import { EditorTool } from "./editor-toolbar/interfaces"
import { Observable } from "rxjs"
import { EditorView } from "prosemirror-view"
import { EditorState } from "prosemirror-state"

export interface Editor {
    viewChange: Observable<any>
    stateChange: Observable<any>
    runTool(tool: EditorTool)
}

export interface EditorEvent {
    view: EditorView
    state: EditorState
}
