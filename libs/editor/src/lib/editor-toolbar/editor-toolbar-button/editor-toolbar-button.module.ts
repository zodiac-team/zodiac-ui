import { NgModule } from "@angular/core"
import { EditorToolbarButtonComponent } from "./editor-toolbar-button.component"
import { MatButtonModule, MatIconModule, MatTooltipModule } from "@angular/material"

@NgModule({
    declarations: [EditorToolbarButtonComponent],
    exports: [EditorToolbarButtonComponent],
    imports: [MatButtonModule, MatTooltipModule, MatIconModule],
})
export class EditorToolbarButtonModule {}
