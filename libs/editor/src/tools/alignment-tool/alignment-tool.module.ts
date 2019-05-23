import { NgModule } from "@angular/core"
import { AlignmentToolComponent } from "./alignment-tool.component"
import { EditorToolbarDropdownModule } from "../../lib/editor-toolbar/editor-toolbar-dropdown/editor-toolbar-dropdown.module"

@NgModule({
    declarations: [AlignmentToolComponent],
    exports: [AlignmentToolComponent],
    imports: [EditorToolbarDropdownModule],
})
export class AlignmentToolModule {}
