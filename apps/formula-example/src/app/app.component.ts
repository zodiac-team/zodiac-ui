import { Component, Type } from "@angular/core"
import { extend, Formula, FormulaBuilder, FormulaBuildFn, FormulaContext } from "@zodiac-ui/formula"
import { FormContainerComponent } from "./form-container/form-container.component"
import { PresentationContainerComponent } from "./presentation-container/presentation-container.component"
import {
    DatepickerComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
} from "@zodiac-ui/formula-material"
import { startWith, throttleTime } from "rxjs/operators"
import { asapScheduler } from "rxjs"

const fb = new FormulaBuilder()

export function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const datePath: any = Symbol("datePath")
const computeAge = Symbol("computeAge")

export class ComputeAge {
    static from(path): Partial<Formula> {
        return {
            data: {
                [datePath]: path,
            },
            resolve: {
                [computeAge]: ComputeAge,
            },
        }
    }

    resolve(ctx: FormulaContext) {
        ctx.model.disable()
        ctx.model.parent.valueChanges.pipe(startWith(ctx.model.value)).subscribe(() => {
            const target = ctx.model.parent.get(ctx.data[datePath])
            const value = target ? target.value : null

            ctx.model.setValue(calculateAge(new Date(value)), { onlySelf: true, emitEvent: false })
        })
    }
}

export const text = (opts: { name: string; class: string; label: string }) =>
    fb.control({
        name: opts.name,
        class: opts.class,
        component: InputComponent,
        data: {
            label: opts.label,
            placeholder: opts.label,
        },
    })

export const fieldset = (opts: { name: string; class: string }) =>
    fb.group({
        name: opts.name,
        class: opts.class,
        component: PresentationContainerComponent,
    })

export const number = (opts: { name: string; class: string; label: string }) =>
    fb.control({
        name: opts.name,
        class: opts.class,
        component: InputComponent,
        data: {
            label: opts.label,
            placeholder: opts.label,
            type: "number",
        },
    })

export const form = (opts: { name: string; class: string }) =>
    fb.array({
        name: opts.name,
        class: opts.class,
        component: FormContainerComponent,
    })

export const container = (opts: { name: string }) =>
    fb.container({
        name: opts.name,
        component: PresentationContainerComponent,
    })

export const datepicker = (opts: { name: string; class: string; label: string }) =>
    fb.control({
        name: opts.name,
        class: opts.class,
        data: {
            label: opts.label,
            placeholder: opts.label,
        },
        component: DatepickerComponent,
    })

export const select = (opts: { name: string; class: string; label: string; options: any[] }) =>
    fb.control({
        name: opts.name,
        class: opts.class,
        data: {
            label: opts.label,
            placeholder: opts.label,
            options: opts.options,
        },
        component: SelectComponent,
    })

export const textarea = (opts: {
    name: string
    class: string
    label: string
    minRows: number
    maxRows: number
}) =>
    fb.control({
        name: opts.name,
        class: opts.class,
        data: {
            label: opts.label,
            placeholder: opts.label,
            autosize: false,
            minRows: opts.minRows,
            maxRows: opts.maxRows,
        },
        component: TextareaComponent,
    })

const users = form({
    name: "users",
    class: "z-form",
})

const user = fieldset({
    name: "user",
    class: "z-fieldset",
})

const name = text({
    name: "name",
    class: "z-name",
    label: "Name",
})

const age = number({
    name: "age",
    class: "z-age",
    label: "Age",
})

const $age = extend(age, ComputeAge.from("dob"))

const dob = datepicker({
    name: "dob",
    class: "z-dob",
    label: "Date of Birth",
})

const favouriteFood = select({
    name: "favouriteFood",
    class: "z-favourite-food",
    label: "Favourite Food",
    options: [
        {
            value: "APPLE_PIE",
            viewValue: "Apple Pie",
        },
        {
            value: "PIZZA",
            viewValue: "Pizza",
        },
    ],
})

const notes = textarea({
    name: "notes",
    class: "z-notes",
    label: "Notes",
    minRows: 5,
    maxRows: 5,
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
    public formula = users(user(name, $age, notes, dob, favouriteFood))

    public value = [
        {
            name: "Bob",
            dob: "1988-01-01",
            favouriteFood: "APPLE_PIE",
            notes:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Aliquam tincidunt porttitor ipsum, vel commodo libero sagittis in. " +
                "Phasellus mi nunc, laoreet nec interdum ut, ullamcorper ac nibh.",
        },
        {
            name: "Jane",
            dob: "1993-01-01",
            favouriteFood: "PIZZA",
            notes:
                "Duis neque lacus, imperdiet quis efficitur id, tempus at augue. " +
                "Vestibulum eu euismod nunc.",
        },
    ]

    handleEvents() {
        // console.log("submit!")
    }

    handleValueChanges(event: any) {
        // console.log('value change!', event)
    }
}
