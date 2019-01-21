import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SelectComponent } from "./select.component"
import { MatSelectModule } from "@angular/material"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    declarations: [SelectComponent],
    entryComponents: [SelectComponent],
    exports: [SelectComponent],
})
export class SelectModule {
}
