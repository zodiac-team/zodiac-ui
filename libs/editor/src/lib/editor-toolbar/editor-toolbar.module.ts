import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EditorToolbarComponent } from "./editor-toolbar.component"
import { EditorToolbarButtonDirective } from "./editor-toolbar-button.directive"
import { MatButtonModule, MatIconModule, MatSelectModule } from "@angular/material"

@NgModule({
    declarations: [EditorToolbarComponent, EditorToolbarButtonDirective],
    exports: [EditorToolbarComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule
    ],
})
export class EditorToolbarModule {
}
