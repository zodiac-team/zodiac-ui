import { EditorState } from "prosemirror-state"
import { Command } from "../interfaces/command"
import { Observable } from "rxjs"
import { EditorEvent } from "../interfaces"

export interface EditorTool {
    tooltip?: string
    label?: string
    icon?: string
    run: Command
    select?(state: EditorState): boolean
    enable?(state: EditorState): boolean
    active?(state: EditorState): boolean

}

export interface EditorToolGroup {
    tooltip?: string
    label?: string
    icon?: string
    tools: EditorTool[]
}

export abstract class EditorToolbar {
    abstract viewChange: Observable<EditorEvent>
    abstract stateChange: Observable<EditorEvent>
    abstract runTool(command: EditorTool): void
}
