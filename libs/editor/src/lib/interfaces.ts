import { EditorTool } from "./editor-toolbar/interfaces"
import { Observable } from "rxjs"

export interface Editor {
    docChange: Observable<any>
    stateChange: Observable<any>
    runTool(tool: EditorTool)
}
