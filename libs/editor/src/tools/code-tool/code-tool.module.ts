import { ComponentFactoryResolver, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { attachCodePanel, CodePanelComponent } from "./code-panel/code-panel.component"
import { STATE_HANDLER } from "../../lib/constants"
import { Overlay } from "@angular/cdk/overlay"
import { MatFormFieldModule, MatSelectModule } from "@angular/material"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"

@NgModule({
    declarations: [CodePanelComponent],
    entryComponents: [CodePanelComponent],
    imports: [CommonModule, MatSelectModule, MatFormFieldModule, EditorToolbarButtonModule],
    providers: [
        {
            provide: STATE_HANDLER,
            useFactory: attachCodePanel,
            deps: [ComponentFactoryResolver, Overlay],
            multi: true,
        },
    ],
})
export class CodeToolModule {}
