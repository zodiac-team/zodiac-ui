import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { InputComponent } from "./input.component"
import { MatFormFieldModule, MatInputModule } from "@angular/material"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
    declarations: [InputComponent],
    entryComponents: [InputComponent],
    exports: [InputComponent],
})
export class InputModule {}
