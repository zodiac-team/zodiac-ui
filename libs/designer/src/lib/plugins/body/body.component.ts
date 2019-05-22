import { ChangeDetectionStrategy, Component, ElementRef, Inject } from "@angular/core"
import { NodeView } from "prosemirror-view"
import { NodeViewContext } from "../../editor/utils/create-node-view"
import { BODY_KEY } from "./constants"
import { Node } from "prosemirror-model"
import { EditorService } from "../../editor/editor.service"
import { PluginKey } from "prosemirror-state"
import { OperatorFunction } from "rxjs"
import { map } from "rxjs/operators"
import { Editor } from "../../editor/interfaces"

export function withPluginState<T extends Editor, U>(
    pluginKey: PluginKey,
): OperatorFunction<T, [T, U]> {
    return function(source$) {
        return source$.pipe(map<T, [T, U]>(editor => [editor, pluginKey.getState(editor.state)]))
    }
}

@Component({
    selector: "z-document",
    template: `
        <z-editor [state]="node"></z-editor>
    `,
    styleUrls: ["./body.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent implements NodeView {
    public dom: any
    public pluginKey: any
    public node: Node

    private editor: EditorService

    constructor(
        context: NodeViewContext,
        el: ElementRef,
        @Inject(BODY_KEY) pluginKey: PluginKey,
        editor: EditorService,
    ) {
        this.dom = el.nativeElement
        this.pluginKey = pluginKey
        this.node = context.node
        this.editor = editor
    }

    public ngOnInit() {}

    public stopEvent() {
        return true
    }

    public selectNode() {
        this.editor.focus()
    }
}
