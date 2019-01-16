import {
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    IterableDiffer,
    IterableDiffers,
    KeyValueDiffer,
    KeyValueDiffers,
    StaticProvider,
    ViewContainerRef,
} from "@angular/core"
import { Formula, FormulaContext, FormulaType } from "../interfaces"
import { FORMULA, FORMULA_DIFFER, FORMULA_NODE } from "../constants"
import { Subject } from "rxjs"
import { startWith } from "rxjs/operators"
import { FormulaArrayNode, FormulaContainerNode, FormulaNode } from "../node/nodes"

export abstract class FormulaRenderer {
    protected vcr: ViewContainerRef
    protected cfr: ComponentFactoryResolver
    protected injector: Injector
    public abstract differ: IterableDiffer<any> | KeyValueDiffer<any, any> | null
    public refs: Map<FormulaNode, ComponentRef<any>>
    public destroyed$: Subject<void>
    public destroyed: boolean

    constructor(vcr, cfr, injector) {
        this.vcr = vcr
        this.cfr = cfr
        this.injector = injector
        this.refs = new Map()
        this.destroyed$ = new Subject()
        this.destroyed = false
    }

    render(node: FormulaNode) {
        const parent = this.injector.get(FORMULA_NODE, null)
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        model: node.model,
                        data: node.formula.data,
                        resolve: {},
                    },
                },
                {
                    provide: FORMULA_NODE,
                    useValue: node,
                },
            ],
        })

        if (node.formula.component && node !== parent) {
            const factory = this.cfr.resolveComponentFactory(node.formula.component)
            this.refs.set(node, this.vcr.createComponent(factory, null, injector))
        } else if (node.children) {
            node.children.forEach(childNode => {
                const renderer = createRenderer(childNode.formula, injector)

                renderer.render(childNode)
            })
        }
    }

    destroy() {
        if (this.destroyed) {
            throw new Error(`FormulaRenderer was already destroyed.`)
        }
        this.refs.forEach(ref => {
            ref.destroy()
        })
        this.destroyed$.next()
        this.destroyed$.complete()
        this.destroyed = true
    }
}

export class FormulaArrayRenderer extends FormulaRenderer {
    differ: IterableDiffer<FormulaNode>

    constructor(vcr, cfr, injector, differs) {
        super(vcr, cfr, injector)

        this.differ = differs.find([]).create()
    }

    addChild(node: FormulaNode) {
        const renderer = createRenderer(node.formula, this.injector)

        renderer.render(node)

        this.refs.set(node, renderer.refs.get(node))
    }

    moveChild(node: FormulaNode, index: number) {
        const child = this.refs.get(node)
        this.vcr.move(child.hostView, index)
    }

    removeChild(node: FormulaNode) {
        const child = this.refs.get(node)

        child.destroy()

        this.refs.delete(node)
    }

    render(node: FormulaArrayNode) {
        const parent = this.injector.get(FORMULA_NODE, null)
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        model: node.model,
                        data: node.formula.data,
                        resolve: {},
                    },
                },
                {
                    provide: FORMULA,
                    useValue: node.formula,
                },
                {
                    provide: FORMULA_NODE,
                    useValue: node,
                },
            ],
        })

        if (node.formula.component && node !== parent) {
            const factory = this.cfr.resolveComponentFactory(node.formula.component)
            this.refs.set(node, this.vcr.createComponent(factory, null, injector))
        } else {
            node.model.valueChanges.pipe(startWith(null)).subscribe(() => {
                const diff = this.differ.diff(node.children)

                if (diff) {
                    diff.forEachRemovedItem(record => {
                        this.removeChild(record.item)
                    })

                    diff.forEachMovedItem(record => {
                        this.moveChild(record.item, record.currentIndex)
                    })

                    diff.forEachAddedItem(record => {
                        this.addChild(record.item)
                    })
                }
            })
        }
    }
}

export class FormulaGroupRenderer extends FormulaRenderer {
    differ: KeyValueDiffer<any, any>

    constructor(vcr, cfr, injector, differs) {
        super(vcr, cfr, injector)

        this.differ = differs.find({}).create()
    }
}

export class FormulaContainerRenderer extends FormulaRenderer {
    differ: null

    constructor(vcr, cfr, injector) {
        super(vcr, cfr, injector)

        this.differ = null
    }

    render(node: FormulaContainerNode) {
        const parent = this.injector.get(FORMULA_NODE, null)
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        model: node.model,
                        data: node.formula.data,
                        resolve: {},
                    },
                },
                {
                    provide: FORMULA_NODE,
                    useValue: node,
                },
            ],
        })

        if (node.formula.component && node !== parent) {
            const factory = this.cfr.resolveComponentFactory(node.formula.component)
            this.refs.set(node, this.vcr.createComponent(factory, null, injector))
        } else {
            node.children.forEach(childNode => {
                const renderer = createRenderer(childNode.formula, injector)

                renderer.render(childNode)
            })
        }
    }
}

export class FormulaDefaultRenderer extends FormulaRenderer {
    differ: null

    constructor(vcr, cfr, injector) {
        super(vcr, cfr, injector)

        this.differ = null
    }
}

export function provideRenderer(formula) {
    const deps = [ViewContainerRef, ComponentFactoryResolver, Injector, FORMULA_DIFFER]

    switch (formula.type) {
        case FormulaType.GROUP: {
            return {
                provide: FormulaGroupRenderer,
                useClass: FormulaGroupRenderer,
                deps: deps,
            }
        }
        case FormulaType.ARRAY: {
            return {
                provide: FormulaArrayRenderer,
                useClass: FormulaArrayRenderer,
                deps: deps,
            }
        }
        case FormulaType.CONTAINER: {
            return {
                provide: FormulaContainerRenderer,
                useClass: FormulaContainerRenderer,
                deps: deps,
            }
        }
        default: {
            return {
                provide: FormulaDefaultRenderer,
                useClass: FormulaDefaultRenderer,
                deps: deps,
            }
        }
    }
}

export function provideDiffer(formula, injector): StaticProvider {
    if (formula.type === FormulaType.ARRAY) {
        return {
            provide: FORMULA_DIFFER,
            useValue: injector.get(IterableDiffers),
        }
    }

    if (formula.type === FormulaType.GROUP) {
        return {
            provide: FORMULA_DIFFER,
            useValue: injector.get(KeyValueDiffers),
        }
    }

    return {
        provide: FORMULA_DIFFER,
        useValue: null,
    }
}

export function createRenderer(formula: Formula, parentInjector: Injector): FormulaRenderer {
    const DIFFER = provideDiffer(formula, parentInjector)
    const RENDERER = provideRenderer(formula)
    const injector = Injector.create({
        parent: parentInjector,
        providers: [
            RENDERER,
            DIFFER,
            {
                provide: FORMULA,
                useValue: formula,
            },
        ],
    })

    if (formula.type === FormulaType.ARRAY) {
        return injector.get(FormulaArrayRenderer)
    }

    if (formula.type === FormulaType.GROUP) {
        return injector.get(FormulaGroupRenderer)
    }

    if (formula.type === FormulaType.CONTAINER) {
        return injector.get(FormulaContainerRenderer)
    }

    return injector.get(FormulaDefaultRenderer)
}
