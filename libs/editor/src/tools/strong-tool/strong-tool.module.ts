import { NgModule } from "@angular/core"
import { StrongToolComponent } from "./strong-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
    declarations: [StrongToolComponent],
    exports: [StrongToolComponent],
    imports: [EditorToolbarButtonModule],
})
export class StrongToolModule {}
