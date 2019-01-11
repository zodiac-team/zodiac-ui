import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { NxModule } from "@nrwl/nx"
import { FormulaModule } from "@zodiac-ui/formula"
import { FormContainerModule } from "./form-container/form-container.module"
import { TextFieldModule } from "./text-field/text-field.module"
import { PresentationContainerModule } from "./presentation-container/presentation-container.module"
import { NumberFieldModule } from "./number-field/number-field.module"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        FormulaModule,
        FormContainerModule,
        TextFieldModule,
        PresentationContainerModule,
        NumberFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
