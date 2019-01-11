import {
    Directive,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SkipSelf,
    ViewContainerRef,
} from "@angular/core"
import { Formula, FormulaOutlet, FormulaRoot } from "./interfaces"
import { AbstractControl, NgForm } from "@angular/forms"
import { createRenderer, FormulaRenderer } from "./renderer/renderers"
import { createModel } from "./node/utils"
import { FORMULA_OUTLET } from "./constants"
import { takeUntil } from "rxjs/operators"
import { createFormulaNode, FormulaNode } from "./node/nodes"

/**
 * Creates a {link FormulaNode} tree that is used to render a form. `FormulaDirective` provides a declarative
 * approach for dynamic forms creation
 *
 * `FormulaDirective` requires a {link Formula}, if a falsy value is set the view will clear and the
 * form will get destroyed.
 *
 * ### Usage
 *
 * The simplest case is a formula with a single field.
 *
 * ```ts
@Component({
    selector: "z-example",
    template: `
        <z-formula [formula]="formula" [value]="value"></z-formula>
    `,
})
export class ExampleComponent {
    value = {
        exampleText: null
    }

    formula: Formula = {
        type: FormulaType.CONTROL,
        name: "exampleText",
        component: TextFieldComponent,
        data: {
            label: "Example Text",
            placeholder: "Type text here"
        },
    }
}
 * ```
 *
 * In this example we are declaring a `formula` that contains a single form control called
 * `exampleText`. It is rendered with a component, which is up to the user to implement. The
 * concept is similar to that of Angular route components. For example, the `TextFieldComponent`
 * may be as simple as this:
 *
 * ```ts
 @Component({
    selector: "z-text-field",
    template: `
        <label [innerHTML]="ctx.data.label"></label>
        <input [formControl]="ctx.model" />
    `,
})
export class TextFieldComponent {
    constructor(public ctx: FormulaContext) {}
}
 * ```
 *
 * Every Formula component receives a {link FormulaContext} containing the model, data and resolve
 * data defined for that node in the `FormulaNode` tree
 *
 */
@Directive({
    selector: "z-formula, [zFormula]",
    providers: [
        {
            provide: FORMULA_OUTLET,
            useExisting: FormulaDirective,
        },
    ],
})
export class FormulaDirective implements FormulaOutlet, OnChanges, OnDestroy {
    public node: FormulaNode
    public model: AbstractControl
    public renderer: FormulaRenderer
    public injector: Injector
    public parent: FormulaOutlet
    public root: FormulaRoot
    public form: NgForm

    @Input()
    public formula: Formula

    @Input()
    public value: any

    @Output()
    public readonly valueChanges: EventEmitter<any> = new EventEmitter()

    @Output()
    public readonly statusChanges: EventEmitter<any> = new EventEmitter()

    @Output()
    public readonly submit: EventEmitter<any> = new EventEmitter()

    constructor(
        injector: Injector,
        vcr: ViewContainerRef,
        @SkipSelf() @Optional() @Inject(FORMULA_OUTLET) parent: FormulaOutlet,
    ) {
        this.injector = Injector.create({
            parent: injector,
            providers: [
                {
                    provide: ViewContainerRef,
                    useValue: vcr,
                },
            ],
        })
        this.parent = parent
        this.root = parent ? parent.root : this
    }

    public ngOnChanges(changes) {
        if (changes.formula) {
            if (!changes.formula.isFirstChange()) {
                this.renderer.destroy()
            }
            if (this.formula) {
                this.renderer = createRenderer(this.formula, this.injector)

                this.render()
            }
        }
        if (changes.value) {
            this.setValue(this.value)
        }
    }

    public ngOnDestroy() {
        if (this.renderer) {
            this.renderer.destroy()
        }
    }

    public setValue(value) {
        if (this.node) {
            this.node.setValue(value)
        }
    }

    public setForm(form: NgForm) {
        if (this.form) {
            throw new Error("Only one top level NgForm is allowed")
        }

        this.form = form

        form.ngSubmit.subscribe(this.submit)
    }

    private render() {
        this.model = createModel(this.formula, this.parent ? this.parent.node.model : null)
        this.node = createFormulaNode(
            this.formula,
            this.model,
            this.parent ? this.parent.node : null,
        )
        this.renderer.render(this.node)

        this.model.valueChanges
            .pipe(takeUntil(this.renderer.destroyed$))
            .subscribe(this.valueChanges)

        this.model.statusChanges
            .pipe(takeUntil(this.renderer.destroyed$))
            .subscribe(this.statusChanges)
    }
}
