import { NgModule } from "@angular/core"
import { NumberFieldComponent } from "./number-field.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [NumberFieldComponent],
    exports: [NumberFieldComponent],
    entryComponents: [NumberFieldComponent],
})
export class NumberFieldModule {}
