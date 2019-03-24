import { NgModule } from "@angular/core"
import { EmphasisToolComponent } from "./emphasis-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
    declarations: [EmphasisToolComponent],
    exports: [EmphasisToolComponent],
    imports: [EditorToolbarButtonModule],
})
export class EmphasisToolModule {}
