import { Injector, Type } from "@angular/core"
import { NodeView } from "prosemirror-view"

export class NgNodeView {
    constructor(node, view, getPos) {

    }
}

export class NgNodeViewFactoryProvider {

}

export function ngNodeViewFactory(component: Type<any>) {
    return (
        node: any,
        view: any,
        getPos: () => number,
    ): NodeView => {
        return new NgNodeView(node, view, getPos);
    };
}
