import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DesignerPanelComponent } from "./designer-panel.component"
import { MatTabsModule } from "@angular/material"

@NgModule({
    declarations: [DesignerPanelComponent],
    exports: [DesignerPanelComponent],
    imports: [CommonModule, MatTabsModule],
})
export class DesignerPanelModule {}
