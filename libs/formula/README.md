# @zodiac-ui/formula

Formula is a powerful form generator built for Angular. Inspired by Angular Router, Formula
provides a declarative interface for building reactive forms.

## Early adopters

Formula is in early development. Don't use this in production.

## At A Glance

With Formula you start with the value you want to model...

```ts
const value = [
    {
        name: "Bob",
        dob: "1988-01-01",
        favouriteFood: "APPLE_PIE",
        notes: "..."
    },
    ...
]
```

...and craft a formula that models your value

```ts
const formula = users(user(name, age, notes, dob, favouriteFood))
```

Then you just hook it up to a component

```ts
@Component({
    selector: "z-root",
    template: `
        <z-formula [formula]="formula" [value]="value"></z-formula>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public formula = formula
    public value = value
}
```

The result

<p align="center">
  <img width="460" height="300" src="docs/images/example.png" title="Build beautiful, powerful forms" />
</p>

If you'd like to learn more, read on or [check out the example](../../apps/formula-example/src/app/app.component.ts).

## Features

Formula aims to achieve feature symmetry with the `Route` interface from `@angular/router` and
`FormBuilder` from `@angular/forms`.

-   Builder (in progress): A convenient utility for generating Formula objects
-   Renderer (in progress): Automatically synchronises the UI based on the current formula and value
-   FormArray (in progress): Automatically populate array controls based on the current value and expose api
    for adding, moving or removing controls
-   Guards (not supported yet): Contextually control whether a form node can be loaded, activated or deactivated
-   Resolve (not supported yet): Contextually fetch remote or async data
    (eg. populating select options based on the current user)
-   LoadChildren (not supported yet): To allow for code splitting/lazy loading
-   StyleGuide (in progress): A common convention for declaring readable, composible, maintainable forms
-   Themes (in progress): Apply different styles to the same form by targeting classes exposed by each form element
-   FormContainer (in progress): Formula provides a container type useful for adding nodes that do not need a model
    (eg. a submit button)
-   Smart Validators (not supported yet): In addition to the usual validator options, Formula will also support
    validator class tokens that will be instantiated with the Angular injector.
-   Computed Fields (in progress): A method for creating one-way or two-way computed fields that react to changes in
    the form model
-   Material (in progress): A [support library](../formula-material) that wraps Angular Material

## FormulaBuilder

Formula provides a form builder to construct Formula objects that are used to render forms.

### API

| Member                                        | Description                                         |
| :-------------------------------------------- | :-------------------------------------------------- |
| `group: FormulaBuildFn<FormulaGroup>`         | Creates a factory for `FormulaType.GROUP` nodes     |
| `array: FormulaBuildFn<FormulaArray>`         | Creates a factory for `FormulaType.ARRAY` nodes     |
| `control: FormulaBuildFn<FormulaControl>`     | Creates a factory for `FormulaType.CONTROL` nodes   |
| `container: FormulaBuildFn<FormulaContainer>` | Creates a factory for `FormulaType.CONTAINER` nodes |

### Usage

Use `FormulaBuilder` to functionally create and compose various form elements together.

```ts
const fb = new FormBuilder()

export const form = (name: string) =>
    fb.group({
        name,
        component: FormContainerComponent,
    })

export const text = (name: string, label: string) =>
    fb.control({
        name,
        component: TextFieldComponent,
        data: {
            label,
        },
    })

export const formula: Formula = form("user")(
    text("firstName", "First Name"),
    text("lastName", "First Name"),
)
```

## FormulaDirective

Creates a `FormulaNode` tree that is used to render a form. `FormulaDirective` provides a declarative
approach for dynamic forms creation
`FormulaDirective` requires a `Formula`, if a falsy value is set the view will clear and the
form will get destroyed.

### API

Formula is under active development. The current API is experimental and likely to change
before release.

| Member                                       | Description                                            |
| :------------------------------------------- | :----------------------------------------------------- |
| `@Input() formula: Formula`                  | The formula to be rendered. See `Formula` for options. |
| `@Input() value: any`                        | Form value setter. Unknown object keys are discarded.  |
| `@Output() valueChanges: EventEmitter<any>`  | Forwards `valueChanges` from `AbstractControl`.        |
| `@Output() statusChanges: EventEmitter<any>` | Forwards `statusChanges` from `AbstractControl`.       |
| `@Output() submit: EventEmitter<any>`        | Forwards `submit` events from a registered `NgForm`.   |
| `setForm(form: NgForm): void`                | Registers a `NgForm` with the outlet.                  |
| `setValue(value: any): void`                 | Immediately patches the value of the form              |

### Usage

The simplest case is a formula with a single field.

```ts
@Component({
    selector: "z-example",
    template: `
        <z-formula [formula]="formula" [value]="value"></z-formula>
    `,
})
export class ExampleComponent {
    value = {
        exampleText: null,
    }

    formula: Formula

    constructor(fb: FormulaBuilder) {
        this.formula = fb.control({
            name: "exampleText",
            component: TextFieldComponent,
            data: {
                label: "Example Text",
                placeholder: "Type text here",
            },
        })
    }
}
```

In this example we are declaring a `formula` that contains a single form control called
`exampleText`. It is rendered with a component, which is up to the user to implement. The
concept is similar to that of Angular route components. For example, the `TextFieldComponent`
may be as simple as this:

```ts
@Component({
    selector: "z-text-field",
    template: `
        <label [innerHTML]="ctx.data.label"></label> <input [formControl]="ctx.model" />
    `,
})
export class TextFieldComponent {
    constructor(public ctx: FormulaContext) {}
}
```

Each component in the tree receives a `FormulaContext` containing the `model`, `data` and `resolve`
data.

> **Important note:** Formula components are rendered dynamically. You may encounter errors about missing
> ComponentFactory or unknown Provider. Ensure all components are marked as entry components and that all providers
> are provided in the NgModule the form gets rendered in.

## FormulaOutlet

Renders the current `FormulaNode` in the node tree. It is functionally similar to `router-outlet`;
use this directive inside Formula components to render children of the current node.

### Usage

Anywhere in your Formula component template, place a single `z-formula-outlet` tag.

```ts
@Component({
    selector: "z-form-container",
    template: `
        <z-form> <z-formula-outlet></z-formula-outlet> </z-form>
    `,
})
export class FormContainerComponent {}
```

## FormComponent

Selectors: `<z-form>`

A basic wrapper for `NgForm` that forwards native submit events to the root `FormulaOutlet`.
If nested inside another `FormComponent`, renders `<ng-form>` instead of `<form>`. Will throw an error
if not used with `FormulaGroup` or `FormulaArray`

### Usage

See [Formula Outlet](#formulaoutlet)
