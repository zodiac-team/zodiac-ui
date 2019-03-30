import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { alignmentPlugin } from "./alignment.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: alignmentPlugin,
        multi: true
    }],
})
export class AlignmentModule {}
