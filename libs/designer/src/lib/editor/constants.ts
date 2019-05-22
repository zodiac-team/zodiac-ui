import { InjectionToken } from "@angular/core"
import { Dictionary } from "../interfaces"
import { MarkSpec, NodeSpec } from "prosemirror-model"
import { EditorContext, EditorOptions, EditorPlugin, EditorPluginOptions } from "./interfaces"

export const EDITOR_NODES = new InjectionToken<Dictionary<NodeSpec>[]>("EDITOR_NODE")
export const EDITOR_MARKS = new InjectionToken<Dictionary<MarkSpec>[]>("EDITOR_MARK")
export const EDITOR_PLUGIN = new InjectionToken<EditorPlugin[]>("EDITOR_PLUGIN")
export const EDITOR_OPTIONS = new InjectionToken<EditorOptions>("EDITOR_OPTIONS")
export const EDITOR_PLUGIN_OPTIONS = new InjectionToken<EditorPluginOptions>(
    "EDITOR_PLUGIN_OPTIONS",
)
export const EDITOR_CONTEXT = new InjectionToken<EditorContext>("EDITOR_CONTEXT")
