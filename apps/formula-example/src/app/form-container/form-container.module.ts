import { NgModule } from "@angular/core"
import { FormContainerComponent } from "./form-container.component"
import { FormModule, FormulaOutletModule } from "@zodiac-ui/formula"

@NgModule({
    imports: [FormulaOutletModule, FormModule],
    declarations: [FormContainerComponent],
    entryComponents: [FormContainerComponent],
    exports: [FormContainerComponent],
})
export class FormContainerModule {}
