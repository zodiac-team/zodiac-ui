import { NgModule } from "@angular/core"
import { PresentationContainerComponent } from "./presentation-container.component"
import { FormulaOutletModule } from "@zodiac-ui/formula"

@NgModule({
    imports: [FormulaOutletModule],
    declarations: [PresentationContainerComponent],
    entryComponents: [PresentationContainerComponent],
    exports: [PresentationContainerComponent],
})
export class PresentationContainerModule {}
