import { Component } from "@angular/core"
import { Formula, FormulaType } from "@zodiac-ui/formula"
import { TextFieldComponent } from "./text-field/text-field.component"
import { FormContainerComponent } from "./form-container/form-container.component"
import { PresentationContainerComponent } from "./presentation-container/presentation-container.component"
import { NumberFieldComponent } from "./number-field/number-field.component"

const formulaChange = {
    type: FormulaType.GROUP,
    name: "test",
    component: FormContainerComponent,
    data: {},
    children: [
        {
            type: FormulaType.CONTROL,
            name: "test",
            component: TextFieldComponent,
            data: {
                label: "Test Label",
            },
        },
    ],
}

const formulaControl = {
    type: FormulaType.CONTROL,
    name: "test",
    data: {
        label: "Test",
    },
    component: TextFieldComponent,
}

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
    public formula: Formula = {
        type: FormulaType.ARRAY,
        name: "test",
        component: FormContainerComponent,
        data: {},
        children: [
            {
                type: FormulaType.GROUP,
                name: "test",
                component: PresentationContainerComponent,
                data: {},
                children: [
                    {
                        type: FormulaType.CONTROL,
                        name: "test",
                        component: TextFieldComponent,
                        data: {
                            label: "Test Label",
                        },
                    },
                    {
                        type: FormulaType.CONTAINER,
                        name: "test2",
                        component: PresentationContainerComponent,
                        data: {},
                        children: [
                            {
                                type: FormulaType.CONTROL,
                                name: "test",
                                component: NumberFieldComponent,
                                data: {
                                    label: "Test Label 2",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }

    public value = [{ test: "testing", test2: 123 }, { test: "testing3", test2: 234 }]

    handleEvents() {
        // console.log("submit!")
    }

    handleValueChanges(event: any) {
        // console.log('value change!', event)
    }
}
