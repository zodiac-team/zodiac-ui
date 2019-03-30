import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { codeBlockPlugin } from "./code.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: codeBlockPlugin(),
        multi: true
    }],
})
export class CodeModule { }
