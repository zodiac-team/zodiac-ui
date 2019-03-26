import { EditorState } from "prosemirror-state"
import { Command } from "../interfaces/command"
import { Observable } from "rxjs"

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
    abstract docChange: Observable<any>
    abstract stateChange: Observable<any>
    abstract runTool(command: EditorTool): void
}
