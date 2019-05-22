import { Decoration, EditorProps, EditorView, NodeView } from "prosemirror-view"
import { MarkSpec, Node, NodeSpec } from "prosemirror-model"
import { Plugin } from "prosemirror-state"
import { Type } from "@angular/core"

export interface Dictionary<T> {
    [key: string]: T
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type DesignerNodeDict = Dictionary<NodeSpec>
export type DesignerMarkDict = Dictionary<MarkSpec>
export type DesignerPluginDict = Dictionary<Plugin>

export type DesignerNodesFactory = (state: EditorProps) => DesignerNodeDict
export type DesignerMarksFactory = (state: EditorProps) => DesignerMarkDict

export type NodeViewFactory = (
    node: Node,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[],
) => NodeView

export type CreateNodeViewFactory = (
    componentOrDirective: Type<NodeView>,
    opts?: { directive: boolean },
) => NodeViewFactory
