import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { textFormattingPlugin } from "./text-formatting.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: textFormattingPlugin,
        multi: true
    }],
})
export class TextFormattingModule {}
