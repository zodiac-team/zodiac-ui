import { NgModule } from "@angular/core"
import { EditorModule } from "../../lib/editor.module"
import { DocModule } from "../../plugins/doc/doc.module"
import { ParagraphModule } from "../../plugins/paragraph/paragraph.module"
import { TextModule } from "../../plugins/text/text.module"
import { EditorToolbarModule } from "../../lib/editor-toolbar/editor-toolbar.module"

@NgModule({
    declarations: [],
    imports: [EditorModule, DocModule, ParagraphModule, TextModule],
    exports: [EditorModule, EditorToolbarModule],
})
export class BasicEditorModule {}
