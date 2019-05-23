import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { BodyComponent } from "./body.component"
import { EditorModule } from "../../editor/editor.module"
import { BODY_PLUGIN } from "./body.plugin"

@NgModule({
    declarations: [BodyComponent],
    entryComponents: [BodyComponent],
    exports: [BodyComponent],
    imports: [CommonModule, EditorModule],
    providers: [BODY_PLUGIN],
})
export class BodyModule {}
