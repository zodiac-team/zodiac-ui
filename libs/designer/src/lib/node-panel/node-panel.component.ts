import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    Renderer2,
} from "@angular/core"
import { EditorService } from "../editor/editor.service"
import { Formula, FormulaBuilder } from "@zodiac-ui/formula"
import { Node } from "prosemirror-model"
import { updateNode } from "./commands/update-node"
import { Selection, PluginKey } from "prosemirror-state"
import { NODE_PANEL_KEY } from "./constants"
import { NodePluginState } from "./node-panel-plugin"
import { StylesPaneComponent } from "./views/styles-pane/styles-pane.component"
import { AttributesPaneComponent } from "./views/attributes-pane/attributes-pane.component"
import { LayoutPaneComponent } from "./views/layout-pane/layout-pane.component"

export interface NodeMetadata {
    name: string
}

const fb = new FormulaBuilder()

const formula = fb.group({
    name: "root",
})

/** LAYOUT **/

const layout = fb.group({
    name: "layout",
    component: LayoutPaneComponent,
})

const position = fb.control({
    name: "position",
})

const margin = fb.control({
    name: "position",
})

const padding = fb.control({
    name: "position",
})

const border = fb.control({
    name: "border",
})

/** ATTRIBUTES **/

const attributes = fb.group({
    name: "attributes",
    component: AttributesPaneComponent,
})

/** STYLES **/

const styles = fb.group({
    name: "styles",
    component: StylesPaneComponent,
})

function createAttributeFields(node: Node) {
    return Object.entries(node.type.spec.attrs).map(([name, value]) => {
        return fb.control({
            name,
            default: value.default,
        })
    })
}

function createAttributes(node: Node) {
    return attributes(...createAttributeFields(node))
}

function createLayout() {
    return layout(position, margin, padding, border)
}

export interface DesignerState {
    activeNode: Node
}

@Component({
    selector: "z-node-panel",
    template: `
        <div class="z-heading">
            <mat-select [value]="node">
                <mat-option *ngFor="let node of ancestors">
                    <span [textContent]="node.name"></span>
                </mat-option>
            </mat-select>
        </div>

        <z-layout-pane [value]="value" (valueChanges)="updateLayout($event)"></z-layout-pane>

        <z-attributes-pane [value]="value"></z-attributes-pane>

        <z-styles-pane [value]="value"></z-styles-pane>
    `,
    styleUrls: ["./node-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodePanelComponent implements OnInit {
    public node: Node
    public ancestors: NodeMetadata[]
    public value: any

    private editor: EditorService
    private cdr: ChangeDetectorRef
    private pluginKey: PluginKey<NodePluginState>
    private selection: Selection
    private renderer: Renderer2

    constructor(
        editor: EditorService,
        cdr: ChangeDetectorRef,
        @Inject(NODE_PANEL_KEY) pluginKey: PluginKey<NodePluginState>,
        renderer: Renderer2,
    ) {
        this.node = null
        this.value = null
        this.ancestors = []
        this.cdr = cdr
        this.editor = editor
        this.pluginKey = pluginKey
        this.renderer = renderer
    }

    public ngOnInit() {
        this.editor.getPluginState(this.pluginKey).subscribe(({ node, selection }) => {
            if (this.node !== node) {
                this.node = node

                if (node) {
                    const element = this.editor.view.nodeDOM(selection.anchor) as HTMLElement

                    this.value = {
                        layout: node.attrs.layout,
                        attributes: node.attrs,
                        style: element.style,
                        element: element,
                        computedStyle: getComputedStyle(element),
                    }
                    this.selection = selection
                } else {
                    this.value = null
                    this.selection = null
                }

                this.cdr.markForCheck()
            }
        })
    }

    public updateNode(value: any) {
        this.editor.runCommand(
            updateNode({
                node: this.node,
                selection: this.selection,
                value,
            }),
        )
    }

    public updateLayout(style: any) {
        if (style.position) {
            this.renderer.setStyle(this.value.element, "position", style.position)
        } else {
            Object.entries(style).forEach(([key, value]) => {
                this.renderer.setStyle(this.value.element, key, `${value}px`)
            })
        }

        this.updateNode({
            style: this.value.element.style.cssText,
        })
    }
}
