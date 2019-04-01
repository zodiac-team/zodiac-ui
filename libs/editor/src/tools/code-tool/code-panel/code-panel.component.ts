import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Injector,
    OnDestroy,
} from "@angular/core"
import { FloatingToolbar } from "../../link-tool/link-panel/link-panel.component"
import { ConnectionPositionPair, Overlay } from "@angular/cdk/overlay"
import { EditorService } from "../../../lib/editor.service"
import { EditorTool, EditorToolbar } from "../../../lib/editor-toolbar/interfaces"
import { ComponentPortal } from "@angular/cdk/portal"
import { CodeBlockState, pluginKey } from "../../../plugins/code/code.plugin"
import { changeLanguage, removeCodeBlock } from "../../../plugins/code/code.command"
import { Subscription } from "rxjs"
import { ModeInfo, modeInfo } from "../../../plugins/code/codemirror"

@Component({
    selector: "z-code-panel",
    template: `
        <mat-form-field>
            <mat-select [value]="mode" placeholder="Select Language" (selectionChange)="handleSelect($event.value)">
                <mat-option>
                    <span>Plain Text</span>
                </mat-option>
                <mat-option *ngFor="let option of options" [value]="option.name">
                    <span [textContent]="option.name"></span>
                </mat-option>
            </mat-select>
        </mat-form-field>
        <z-editor-toolbar-button [tool]="deleteCode"></z-editor-toolbar-button>
    `,
    styleUrls: ["./code-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePanelComponent implements OnDestroy {
    options: ModeInfo[]
    toolbar: FloatingToolbar
    mode: string
    sub: Subscription
    deleteCode: EditorTool

    constructor(toolbar: FloatingToolbar, cdr: ChangeDetectorRef) {
        this.options = modeInfo
        this.toolbar = toolbar
        this.deleteCode = {
            tooltip: "Remove",
            icon: "fa-trash-alt",
            run: removeCodeBlock
        }

        this.sub = this.toolbar.stateChange.subscribe(editor => {
            const pluginState: CodeBlockState = pluginKey.getState(editor.state)

            this.mode = pluginState.language

            this.toolbar.overlay.updatePosition()

            cdr.markForCheck()
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    handleSelect(mode: string) {
        this.toolbar.runTool({
            run: changeLanguage(mode)
        })
    }
}

export function attachCodePanel(
    componentFactoryResolver: ComponentFactoryResolver,
    overlay: Overlay,
    parentInjector: Injector,
) {
    const overlayRef = overlay.create()
    let previousOrigin

    return (editor: EditorService) => {
        const pluginState: CodeBlockState = pluginKey.getState(editor.state)
        const origin = pluginState.element

        if (!pluginState.toolbarVisible) {
            overlayRef.detach()
            return
        }

        const toolbar = new FloatingToolbar(editor, overlayRef)
        const injector = Injector.create({
            parent: parentInjector,
            providers: [
                {
                    provide: FloatingToolbar,
                    useValue: toolbar,
                },
                {
                    provide: EditorToolbar,
                    useValue: toolbar,
                },
            ],
        })
        const linkPanelPortal = new ComponentPortal(CodePanelComponent, null, injector)
        const positions = [
            new ConnectionPositionPair(
                { originX: "center", originY: "bottom" },
                { overlayX: "center", overlayY: "top" },
            ),
        ]

        if (previousOrigin !== origin) {
            overlayRef.detach()
        }

        if (!overlayRef.hasAttached()) {
            overlayRef.attach(linkPanelPortal)

            const strategy = overlay
                .position()
                .flexibleConnectedTo(origin)
                .withFlexibleDimensions(false)
                .withPush(false)
                .withPositions(positions)

            const scrollStrategy = overlay.scrollStrategies.reposition()

            strategy.attach(overlayRef)
            strategy.apply()

            scrollStrategy.attach(overlayRef)
            scrollStrategy.enable()

            overlayRef.updatePositionStrategy(strategy)

            previousOrigin = origin
        }
    }
}
