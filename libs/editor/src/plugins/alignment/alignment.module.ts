import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AlignmentToolComponent } from "./alignment-tool/alignment-tool.component"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { alignmentPlugin } from "./alignment.plugin"

@NgModule({
    declarations: [AlignmentToolComponent],
    exports: [AlignmentToolComponent],
    imports: [CommonModule],
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: alignmentPlugin,
        multi: true
    }],
})
export class AlignmentModule {}
