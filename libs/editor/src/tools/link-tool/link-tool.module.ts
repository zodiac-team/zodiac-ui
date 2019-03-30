import { ComponentFactoryResolver, NgModule } from "@angular/core"
import { LinkToolComponent } from "./link-tool.component"
import { EditorToolbarButtonModule } from "../../lib/editor-toolbar/editor-toolbar-button/editor-toolbar-button.module"
import { attachLinkPanel, LinkPanelComponent } from "./link-panel/link-panel.component"
import { STATE_HANDLER } from "../../lib/constants"
import { Overlay } from "@angular/cdk/overlay"
import { MatFormFieldModule, MatInputModule } from "@angular/material"
import { CommonModule } from "@angular/common"

@NgModule({
    declarations: [LinkToolComponent, LinkPanelComponent],
    entryComponents: [LinkPanelComponent],
    exports: [LinkToolComponent, LinkPanelComponent],
    imports: [CommonModule, EditorToolbarButtonModule, MatInputModule, MatFormFieldModule],
    providers: [
        {
            provide: STATE_HANDLER,
            useFactory: attachLinkPanel,
            deps: [ComponentFactoryResolver, Overlay],
            multi: true
        },
    ]
})
export class LinkToolModule {}
