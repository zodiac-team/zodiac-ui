import { NgModule } from "@angular/core"
import { DatepickerComponent } from "./datepicker.component"
import { ReactiveFormsModule } from "@angular/forms"
import { MatDatepickerModule, MatFormFieldModule, MatInputModule } from "@angular/material"

@NgModule({
    imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
    declarations: [DatepickerComponent],
    entryComponents: [DatepickerComponent],
    exports: [DatepickerComponent],
})
export class DatepickerModule {}
