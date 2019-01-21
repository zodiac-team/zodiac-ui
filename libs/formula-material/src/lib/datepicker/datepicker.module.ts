import { NgModule } from "@angular/core"
import { DatepickerComponent } from "./datepicker.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [DatepickerModule, ReactiveFormsModule],
    declarations: [DatepickerComponent],
    entryComponents: [DatepickerComponent],
    exports: [DatepickerComponent],
})
export class DatepickerModule {}
