import { NgModule } from "@angular/core"
import { FormComponent } from "./form.component"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [FormComponent],
    entryComponents: [FormComponent],
    exports: [FormComponent],
})
export class FormModule {}
