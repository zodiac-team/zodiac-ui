import { NgModule } from "@angular/core"
import { StrikeToolComponent } from "./strike-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
  declarations: [StrikeToolComponent],
  exports: [StrikeToolComponent],
  imports: [
    EditorToolbarButtonModule
  ]
})
export class StrikeToolModule { }
