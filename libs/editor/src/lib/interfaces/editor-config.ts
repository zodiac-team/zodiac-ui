import { EditorProps, NodeView } from "prosemirror-view"
import { MarkSpec, NodeSpec, Schema } from "prosemirror-model"
import { Plugin, PluginKey } from "prosemirror-state"

export interface NodeConfig {
    name: string
    node: NodeSpec
}

export interface MarkConfig {
    name: string
    mark: MarkSpec
}

export interface NodeViewConfig {
    name: string
    nodeView: NodeView
}

export interface Listeners {
    [name: string]: Listener[]
}
export type Listener<T = any> = (data: T) => void

export type Dispatch<T = any> = (eventName: PluginKey | string, data: T) => void

export class EventDispatcher<T = any> {
    private listeners: Listeners = {}

    on(event: string, cb: Listener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(cb)
    }

    off(event: string, cb: Listener<T>): void {
        if (!this.listeners[event]) {
            return
        }

        this.listeners[event] = this.listeners[event].filter(callback => callback !== cb)
    }

    emit(event: string, data: T): void {
        if (!this.listeners[event]) {
            return
        }

        this.listeners[event].forEach(cb => cb(data))
    }

    destroy(): void {
        this.listeners = {}
    }
}

export type PMPluginFactory = (params: {
    schema: Schema
    dispatch: Dispatch
    eventDispatcher: EventDispatcher
    // providerFactory: ProviderFactory;
    // errorReporter: ErrorReporter;
    // portalProviderAPI: PortalProviderAPI;
    // reactContext: () => { [key: string]: any };
}) => Plugin | undefined

export interface EditorConfig {
    nodes: NodeConfig[]
    marks: MarkConfig[]
    pmPlugins: { name: string; plugin: PMPluginFactory }[]
    // contentComponents: UIComponentFactory[];
    // primaryToolbarComponents: ToolbarUIComponentFactory[];
    // secondaryToolbarComponents: UIComponentFactory[];
}
