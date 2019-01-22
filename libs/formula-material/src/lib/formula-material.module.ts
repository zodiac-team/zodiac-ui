import { NgModule } from "@angular/core"
import { AutocompleteModule } from "./autocomplete/autocomplete.module"
import { DatepickerModule } from "./datepicker/datepicker.module"
import { InputModule } from "./input/input.module"
import { SelectModule } from "./select/select.module"
import { TextareaModule } from "./textarea/textarea.module"

@NgModule({
    imports: [
        AutocompleteModule,
        DatepickerModule,
        InputModule,
        SelectModule,
        TextareaModule
    ],
})
export class FormulaMaterialModule {}
