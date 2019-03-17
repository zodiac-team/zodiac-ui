import { Transaction } from "prosemirror-state"
import { Subject } from "rxjs"

export type AlignmentState = "start" | "end" | "center"

export interface AlignmentPluginState {
    align: AlignmentState
    isEnabled: boolean
}

export interface ActionHandlerParams {
    dispatch: Subject<any>
    pluginState: AlignmentPluginState
    tr: Transaction
    params?: {
        align?: string
        disabled?: boolean
    }
}
