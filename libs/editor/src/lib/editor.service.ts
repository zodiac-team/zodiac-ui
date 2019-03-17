import { Injectable } from "@angular/core"
import { Editor } from "./interfaces"

@Injectable({
    providedIn: "root",
})
export class EditorService implements Editor {

    constructor() {
    }

    sendCommand(event) {
    }
}
