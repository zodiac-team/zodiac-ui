import { NgModule } from "@angular/core"
import {
    AlignmentToolModule,
    BasicEditorModule as Editor,
    EmphasisToolModule,
    StrikeToolModule,
    StrongToolModule,
    SubscriptToolModule,
    SuperscriptToolModule,
    UnderlineToolModule,
} from "@zodiac-ui/editor"
import { BasicEditorComponent } from "./basic-editor.component"

@NgModule({
    imports: [
        Editor,
        StrongToolModule,
        AlignmentToolModule,
        EmphasisToolModule,
        UnderlineToolModule,
        SuperscriptToolModule,
        SubscriptToolModule,
        StrikeToolModule,
    ],
    exports: [BasicEditorComponent],
    declarations: [BasicEditorComponent],
    providers: [],
})
export class BasicEditorModule {}
