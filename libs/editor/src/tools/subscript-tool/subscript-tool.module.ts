import { NgModule } from "@angular/core"
import { SubscriptToolComponent } from "./subscript-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
  declarations: [SubscriptToolComponent],
  exports: [SubscriptToolComponent],
  imports: [
    EditorToolbarButtonModule
  ]
})
export class SubscriptToolModule { }
