import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { hardBreakPlugin } from "./hard-break.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: hardBreakPlugin,
        multi: true
    }],
})
export class HardBreakModule {}
