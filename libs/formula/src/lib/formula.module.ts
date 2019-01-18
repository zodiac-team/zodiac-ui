import { NgModule } from "@angular/core"
import { FormulaDirective } from "./formula.directive"
import { ReactiveFormsModule } from "@angular/forms"
import { FormulaBuilder } from "./formula-builder"

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [FormulaDirective],
    exports: [FormulaDirective],
    providers: [
        FormulaBuilder
    ]
})
export class FormulaModule {}
