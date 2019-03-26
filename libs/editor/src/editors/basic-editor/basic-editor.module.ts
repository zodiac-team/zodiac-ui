import { NgModule } from "@angular/core"
import { EditorModule } from "../../lib/editor.module"
import { DocModule } from "../../plugins/doc/doc.module"
import { ParagraphModule } from "../../plugins/paragraph/paragraph.module"
import { TextModule } from "../../plugins/text/text.module"
import { AlignmentModule } from "../../plugins/alignment/alignment.module"
import { HardBreakModule } from "../../plugins/hard-break/hard-break.module"
import { BlockTypeModule } from "../../plugins/block-type/block-type.module"
import { BaseModule } from "../../plugins/base/base.module"
import { EditorToolbarModule } from "../../lib/editor-toolbar/editor-toolbar.module"
import { TextFormattingModule } from "../../plugins/text-formatting/text-formatting.module"
import { CodeModule } from "../../plugins/code/code.module"
import { HeadingModule } from "../../plugins/heading/heading.module"
import { BlockquoteModule } from "../../plugins/blockquote/blockquote.module"

@NgModule({
    declarations: [],
    imports: [
        EditorModule,
        EditorToolbarModule,
        DocModule,
        ParagraphModule,
        HeadingModule,
        BlockquoteModule,
        TextModule,
        AlignmentModule,
        HardBreakModule,
        BlockTypeModule,
        BaseModule,
        TextFormattingModule,
        CodeModule
    ],
    exports: [EditorModule, EditorToolbarModule],
})
export class BasicEditorModule {}
