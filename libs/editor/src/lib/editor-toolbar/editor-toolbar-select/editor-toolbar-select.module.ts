import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EditorToolbarSelectComponent } from "./editor-toolbar-select.component"
import { MatIconModule, MatSelectModule, MatTooltipModule } from "@angular/material"

@NgModule({
  declarations: [EditorToolbarSelectComponent],
  exports: [EditorToolbarSelectComponent],
  imports: [
      CommonModule, MatSelectModule, MatIconModule, MatTooltipModule
  ]
})
export class EditorToolbarSelectModule { }
