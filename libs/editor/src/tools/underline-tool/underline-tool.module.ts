import { NgModule } from "@angular/core"
import { UnderlineToolComponent } from "./underline-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
    declarations: [UnderlineToolComponent],
    exports: [UnderlineToolComponent],
    imports: [EditorToolbarButtonModule],
})
export class UnderlineToolModule {}
