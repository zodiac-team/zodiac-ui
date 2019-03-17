import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EditorComponent } from "./editor.component"
import { AlignmentModule } from "../plugins/alignment/alignment.module"

@NgModule({
    imports: [
        CommonModule,
        AlignmentModule
    ],
    declarations: [EditorComponent],
    exports: [EditorComponent],
})
export class EditorModule {
}
