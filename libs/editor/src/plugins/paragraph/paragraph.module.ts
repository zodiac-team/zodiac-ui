import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { paragraphPlugin } from "./paragraph.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: paragraphPlugin,
        multi: true
    }],
})
export class ParagraphModule {}
