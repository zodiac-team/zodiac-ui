import { Component, Type } from "@angular/core"
import { Formula, FormulaBuilder, FormulaType } from "@zodiac-ui/formula"
import { TextFieldComponent } from "./text-field/text-field.component"
import { FormContainerComponent } from "./form-container/form-container.component"
import { PresentationContainerComponent } from "./presentation-container/presentation-container.component"
import { NumberFieldComponent } from "./number-field/number-field.component"

const fb = new FormulaBuilder()

export const text = (name: string, label: string) =>
    fb.control({
        name,
        component: TextFieldComponent,
        data: {
            label,
        }
    })

export const fieldset = (name: string) =>
    fb.group({
        name,
        component: PresentationContainerComponent
    })

export const number = (name: string, label: string) =>
    fb.control({
        name,
        component: NumberFieldComponent,
        data:  {
            label
        }
    })

export const form = (name: string) =>
    fb.array({
        name,
        component: FormContainerComponent
    })

export const container = (name: string) =>
    fb.container({
        name,
        component: PresentationContainerComponent
    })

@Component({
    selector: "z-root",
    template: `
        <z-formula
            [formula]="formula"
            [value]="value"
            (valueChanges)="handleValueChanges($event)"
            (submit)="handleEvents()"
        ></z-formula>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public formula =
        form("test")(
            fieldset("test")(
                text("test", "Test Label"),
                container("test2")(
                    number("test", "Test Label 2")
                )
            )
        )

    public value = [{ test: "testing", test2: 123 }, { test: "testing3", test2: 234 }]

    constructor() {
        console.log(this.formula)
    }

    handleEvents() {
        // console.log("submit!")
    }

    handleValueChanges(event: any) {
        // console.log('value change!', event)
    }
}
