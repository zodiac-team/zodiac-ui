import { NgModule } from "@angular/core"
import { AutocompleteComponent } from "./autocomplete.component"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material"

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      AutocompleteModule,
      MatInputModule
  ],
  declarations: [AutocompleteComponent],
  entryComponents: [AutocompleteComponent],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule { }
