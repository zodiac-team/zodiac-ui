import { NgModule } from "@angular/core"
import { FormFieldComponent } from "./form-field.component"
import { FormulaOutletModule } from "@zodiac-ui/formula"

@NgModule({
  imports: [
      FormFieldModule,
      FormulaOutletModule
  ],
  declarations: [FormFieldComponent],
  entryComponents: [FormFieldComponent],
  exports: [FormFieldComponent]
})
export class FormFieldModule { }
