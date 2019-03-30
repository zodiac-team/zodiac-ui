import { NgModule } from "@angular/core"
import { SuperscriptToolComponent } from "./superscript-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
    declarations: [SuperscriptToolComponent],
    exports: [SuperscriptToolComponent],
    imports: [EditorToolbarButtonModule],
})
export class SuperscriptToolModule {}
