# @zodiac-ui/formula

Formula is a powerful form generator built for Angular. Inspired by Angular Router, Formula
provides a declarative interface for building forms that should be very familiar to experienced
Angular developers.

## Early adopters

Formula is in very early development. Please do not use this in production yet.

## Why Formula?

Forms are complex things. Client-side form generation often comes with tradeoffs
in complexity, performance, and the inability to meet business requirements.

Formula is built with power in mind, utilising the full power of
Angular forms.

Formula is built for speed and efficiency. There are no wasted rendering cycles. Formula only
renders what you tell it to.

## Features

Formula aims to achieve feature symmetry with the `Route` interface from `@angular/router` and
`FormBuilder` from `@angular/forms`.

-   Renderer (in progress): Automatically synchronises the UI based on the current formula and value
-   FormArray (in progress): Automatically populate array controls based on the current value and expose api
    for adding, moving or removing controls
-   Guards (not supported yet): Contextually control whether a form node can be loaded, activated or deactivated
-   Resolve (not supported yet): Contextually fetch remote or async data
    (eg. populating select options based on the current user)
-   LoadChildren (not supported yet): To allow for code splitting/lazy loading

There will also be some enhancements:

-   FormContainer (in progress): Formula provides a container type useful for adding nodes that do not need a model
    (eg. a submit button)
-   Smart Validators (not supported yet): In addition to the usual validator options, Formula will also support
    validator class tokens that will be instantiated with the Angular injector.

## FormulaDirective

Creates a `FormulaNode` tree that is used to render a form. `FormulaDirective` provides a declarative
approach for dynamic forms creation
`FormulaDirective` requires a `Formula`, if a falsy value is set the view will clear and the
form will get destroyed.

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

    formula: Formula = {
        type: FormulaType.CONTROL,
        name: "exampleText",
        component: TextFieldComponent,
        data: {
            label: "Example Text",
            placeholder: "Type text here",
        },
    }
}
```

In this example we are declaring a `formula` that contains a single form control called
`exampleText`. It is rendered with a component, which is up to the user to implement. The
concept is similar to that of Angular route components. For example, the `TextFieldComponent`
may be as simple as this:

### Public API

Formula is under active development. The current API is experimental and likely to change
before release.

|                                              |                                                        |
| -------------------------------------------- | ------------------------------------------------------ |
| `@Input() formula: Formula`                  | The formula to be rendered. See `Formula` for options. |
| `@Input() value: any`                        | Form value setter. Unknown object keys are discarded.  |
| `@Output() valueChanges: EventEmitter<any>`  | Forwards `valueChanges` from `AbstractControl`.        |
| `@Output() statusChanges: EventEmitter<any>` | Forwards `statusChanges` from `AbstractControl`.       |
| `@Output() statusChanges: EventEmitter<any>` | Forwards `submit` events from a registered `NgForm`.   |
| `setForm(form: NgForm): void`                | Registers a `NgForm` with the outlet.                  |
| `setValue(value: any): void`                 | Immediately patches the value of the form              |

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

In many cases you probably want a native `form` element as the top level component in your form.
This is a minimal way to achieve that. All child nodes are now rendered between the `<z-form>`
tags.

## FormContainer

A basic wrapper for `NgForm` that handles forwards submit events to the root `FormulaOutlet`.
The top level will render a native `<form>` element, nested forms will render `<ng-form>`
