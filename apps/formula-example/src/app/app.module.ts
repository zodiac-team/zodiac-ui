import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent, ComputeAge } from "./app.component"
import { FormulaModule } from "@zodiac-ui/formula"
import { FormContainerModule } from "./form-container/form-container.module"
import { TextFieldModule } from "./text-field/text-field.module"
import { PresentationContainerModule } from "./presentation-container/presentation-container.module"
import { NumberFieldModule } from "./number-field/number-field.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormulaMaterialModule } from "@zodiac-ui/formula-material"
import { MatNativeDateModule } from "@angular/material"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormulaModule,
        FormContainerModule,
        TextFieldModule,
        PresentationContainerModule,
        NumberFieldModule,
        BrowserAnimationsModule,
        FormulaMaterialModule,
        MatNativeDateModule,
    ],
    providers: [ComputeAge],
    bootstrap: [AppComponent],
})
export class AppModule {}
