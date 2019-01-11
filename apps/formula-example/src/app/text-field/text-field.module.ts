import { NgModule } from "@angular/core"
import { TextFieldComponent } from "./text-field.component"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [TextFieldComponent],
    entryComponents: [TextFieldComponent],
    exports: [TextFieldComponent],
})
export class TextFieldModule {}
