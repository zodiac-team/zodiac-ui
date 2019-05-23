import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DesignerMenuComponent } from "./designer-menu.component"
import { MatButtonModule, MatToolbarModule } from "@angular/material"

@NgModule({
    declarations: [DesignerMenuComponent],
    exports: [DesignerMenuComponent],
    imports: [CommonModule, MatButtonModule, MatToolbarModule],
})
export class DesignerMenuModule {}
