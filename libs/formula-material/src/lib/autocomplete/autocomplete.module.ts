import { NgModule } from "@angular/core"
import { AutocompleteComponent } from "./autocomplete.component"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatAutocompleteModule, MatInputModule } from "@angular/material"

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatInputModule
  ],
  declarations: [AutocompleteComponent],
  entryComponents: [AutocompleteComponent],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule { }
