import { NgModule } from "@angular/core"
import { FormulaDirective } from "./formula.directive"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    imports: [ReactiveFormsModule],
    declarations: [FormulaDirective],
    exports: [FormulaDirective],
})
export class FormulaModule {}
