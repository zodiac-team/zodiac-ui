import { NgModule } from "@angular/core"
import { EditorToolbarDropdownComponent } from "./editor-toolbar-dropdown.component"
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from "@angular/material"
import { CommonModule } from "@angular/common"

@NgModule({
    declarations: [EditorToolbarDropdownComponent],
    exports: [EditorToolbarDropdownComponent],
    imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class EditorToolbarDropdownModule {}
