import { NgModule } from "@angular/core"
import { EditorModule } from "../../lib/editor.module"
import { DocModule } from "../../plugins/doc/doc.module"
import { ParagraphModule } from "../../plugins/paragraph/paragraph.module"
import { TextModule } from "../../plugins/text/text.module"
import { AlignmentModule } from "../../plugins/alignment/alignment.module"
import { HardBreakModule } from "../../plugins/hard-break/hard-break.module"

@NgModule({
    declarations: [],
    imports: [EditorModule, DocModule, ParagraphModule, TextModule, AlignmentModule, HardBreakModule],
    exports: [EditorModule],
})
export class BasicEditorModule {
}
