import {
    Component,
    ChangeDetectionStrategy,
    Injector,
    Type,
    NgModuleFactory,
    ComponentRef,
    ComponentFactoryResolver, NgModuleRef, ViewContainerRef, ComponentFactory, InjectionToken,
} from "@angular/core"
import { EditorView, NodeView } from "prosemirror-view"
import { Node } from "prosemirror-model"

export class EditorNodeViewContext {
    public node: Node
    public view: EditorView
    public getPos: () => number

    constructor(node: Node, view: EditorView, getPos: () => number) {
        this.node = node
        this.view = view
        this.getPos = getPos
    }
}

export class EditorNodeView implements NodeView {

    public componentFactory: ComponentFactory<any>

    public parentInjector: Injector

    public ngModule: NgModuleRef<any>

    public componentRef: ComponentRef<any>

    public node: Node

    public view: EditorView

    public getPos: () => number

    constructor(node: Node, view: EditorView, getPos: () => number, componentFactory: ComponentFactory<any>, injector?: Injector, ngModule?: NgModuleRef<any>) {
        this.componentFactory = componentFactory
        this.parentInjector = injector
        this.ngModule = ngModule
    }

    public createComponent() {
        const injector = Injector.create({
            parent: this.parentInjector,
            providers: [{
                provide: EditorNodeViewContext,
                useValue: new EditorNodeViewContext(this.node, this.view, this.getPos)
            }]
        })

        this.componentRef = this.componentFactory.create(injector, null, this.node, this.ngModule)
    }

    public selectNode() {
        console.log('select???')
        if (this.componentRef) {
            this.componentRef.hostView.reattach()
        } else {
            this.createComponent()
        }
    }

    public deselectNode() {
        this.componentRef.hostView.detach()
    }

    public destroy() {
        this.componentRef.destroy()
    }
}

export function editorNodeView(componentFactory: ComponentFactory<any>, injector?: Injector, ngModule?: NgModuleRef<any>) {
    return (node: Node, view: EditorView, getPos: () => number) => new EditorNodeView(node, view, getPos, componentFactory, injector, ngModule)
}
