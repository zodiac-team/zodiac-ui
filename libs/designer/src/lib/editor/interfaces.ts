import { EditorState, Plugin, PluginKey, PluginSpec, Transaction } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { ReplaySubject, Subject } from "rxjs"
import { InjectionToken, Injector } from "@angular/core"
import { Dispatch } from "../../../../editor/src/lib/interfaces/editor-config"
import { Schema } from "prosemirror-model"

export interface Editor {
    state: EditorState
    view: EditorView
    stateChange: ReplaySubject<EditorEvent>
    viewChange: Subject<EditorEvent>
}

export interface EditorEvent {
    state: EditorState
    view: EditorView
}

export type EditorPlugin = Plugin
export type EditorPluginFactory = (...args: any[]) => PluginSpec
export interface EditorPluginFactoryProvider {
    useFactory: EditorPluginFactory
    provide?: InjectionToken<PluginKey>
    deps?: any[]
}
export interface EditorPluginValueProvider {
    useValue: PluginSpec
    provide?: InjectionToken<PluginKey>
}

export type EditorPluginProvider = EditorPluginFactoryProvider | EditorPluginValueProvider

export function isEditorPluginFactoryProvider(
    provider: EditorPluginProvider,
): provider is EditorPluginFactoryProvider {
    return provider.hasOwnProperty("useFactory")
}

export type EditorOptions = { topNode?: string; defaultState?: any } & { [key: string]: any }

export interface EditorPluginOptions {
    [key: string]: any
}

export interface EditorContext {
    dispatch: Dispatch
    schema: Schema
    pluginOptions: EditorPluginOptions
}

export type Command = (
    state: EditorState,
    dispatch?: (tr: Transaction) => void,
    view?: EditorView,
) => boolean
