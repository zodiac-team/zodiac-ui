import {
    ApplicationRef,
    ComponentFactoryResolver,
    InjectionToken,
    Injector,
    NgZone,
    Type,
} from "@angular/core"
import { Decoration, EditorView } from "prosemirror-view"
import { CreateNodeViewFactory } from "../../interfaces"
import { Node } from "prosemirror-model"
import { take } from "rxjs/operators"

export const NODE_VIEW_FACTORY = new InjectionToken<CreateNodeViewFactory>("NODE_VIEW_FACTORY")

export const NODE_VIEW_FACTORY_PROVIDER = {
    provide: NODE_VIEW_FACTORY,
    useFactory: createNodeViewFactory,
    deps: [Injector, ComponentFactoryResolver, ApplicationRef, NgZone],
}

export class NodeViewContext {
    public node: Node
    public view: EditorView
    public getPos: () => number
    public decorations: Decoration[]

    constructor(node: Node, view: EditorView, getPos: () => number, decorations: Decoration[]) {
        Object.assign(this, {
            node,
            view,
            getPos,
            decorations,
        })
    }
}

export function createNodeViewFactory(
    parentInjector: Injector,
    componentFactoryResolver: ComponentFactoryResolver,
    appRef: ApplicationRef,
    zone: NgZone,
): CreateNodeViewFactory {
    return function(componentOrDirective: Type<any>, opts: any = {}) {
        return function(
            node: Node,
            view: EditorView,
            getPos: () => number,
            decorations: Decoration[],
        ) {
            const injector = Injector.create({
                parent: parentInjector,
                providers: [
                    {
                        provide: NodeViewContext,
                        useValue: new NodeViewContext(node, view, getPos, decorations),
                    },
                ],
            })

            if (opts.directive) {
                return injector.get(componentOrDirective)
            } else {
                const componentFactory = componentFactoryResolver.resolveComponentFactory(
                    componentOrDirective,
                )
                const componentRef = componentFactory.create(injector)

                zone.onStable.pipe(take(1)).subscribe(() => {
                    appRef.attachView(componentRef.hostView)
                })

                if (componentRef.instance.destroy) {
                    componentRef.instance.destroy = () => {
                        componentRef.instance.destroy()
                        componentRef.destroy()
                    }
                } else {
                    componentRef.instance.destroy = () => componentRef.destroy()
                }

                // type casting to access hidden prop
                return componentRef.instance
            }
        }
    }
}
