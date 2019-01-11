import {
    Directive,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
    SkipSelf,
    ViewContainerRef,
} from "@angular/core"
import { createRenderer, FormulaRenderer } from "../renderer/renderers"
import { FORMULA, FORMULA_NODE, FORMULA_OUTLET } from "../constants"
import { Formula, FormulaOutlet, FormulaRoot } from "../interfaces"
import { FormulaNode } from "../node/nodes"

/**
 * Renders the current {link FormulaNode} in the tree. Being functionally similar to `router-outlet`,
 * use this directive inside Formula components to continue rendering child nodes of the current
 * branch in the node tree.
 *
 * ### Usage
 *
 * Anywhere in your Formula component template, place a single `z-formula-outlet` tag.
 *
 * ```ts
@Component({
    selector: 'z-form-container',
    template: `
      <form>
          <z-formula-outlet></z-formula-outlet>
      </form>
    `,
})
export class FormContainerComponent {}
 * ```
 *f
 * In many cases you probably want a native `form` element as the top level component in your form.
 * This is a minimal way to achieve that. All child nodes will now be rendered between the `<form>`
 * tags.
 */
@Directive({
    selector: "z-formula-outlet, [zFormulaOutlet]",
    providers: [
        {
            provide: FORMULA_OUTLET,
            useExisting: FormulaOutletDirective,
        },
    ],
})
export class FormulaOutletDirective implements FormulaOutlet, OnInit, OnDestroy {
    public readonly node: FormulaNode
    public readonly renderer: FormulaRenderer
    public readonly parent: FormulaOutlet
    public readonly root: FormulaRoot
    public readonly injector: Injector

    constructor(
        injector: Injector,
        vcr: ViewContainerRef,
        @Inject(FORMULA) formula: Formula,
        @Inject(FORMULA_NODE) node: FormulaNode,
        @SkipSelf() @Inject(FORMULA_OUTLET) parent: FormulaOutlet,
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
        this.root = parent.root
        this.node = node
        this.renderer = createRenderer(formula, injector)
    }

    public ngOnInit() {
        this.render()
    }

    public ngOnDestroy() {
        this.renderer.destroy()
    }

    public setValue(value) {
        this.node.setValue(value)
    }

    private render() {
        this.renderer.render(this.node)
    }
}
