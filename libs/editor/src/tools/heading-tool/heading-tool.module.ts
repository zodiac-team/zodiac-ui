import { NgModule } from "@angular/core"
import { HeadingToolComponent } from "./heading-tool.component"
import { EditorToolbarSelectModule } from "../../lib/editor-toolbar/editor-toolbar-select/editor-toolbar-select.module"

@NgModule({
  declarations: [HeadingToolComponent],
  exports: [HeadingToolComponent],
    imports: [
        EditorToolbarSelectModule,
    ],
})
export class HeadingToolModule { }
