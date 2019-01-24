import { NgModule } from "@angular/core"
import { TextareaComponent } from "./textarea.component"
import { ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule, MatInputModule } from "@angular/material"

@NgModule({
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
    declarations: [TextareaComponent],
    entryComponents: [TextareaComponent],
    exports: [TextareaComponent],
})
export class TextareaModule {}
