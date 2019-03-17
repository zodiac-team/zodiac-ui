import { InjectionToken } from "@angular/core"
import { EditorPlugin } from "./interfaces/editor-plugin"

export const EDITOR_PLUGIN = new InjectionToken<EditorPlugin>("EDITOR_PLUGIN")
