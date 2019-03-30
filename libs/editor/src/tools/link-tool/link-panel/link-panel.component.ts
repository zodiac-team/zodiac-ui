import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver, ElementRef, HostListener,
    Injectable,
    Injector,
    OnDestroy,
} from "@angular/core"
import { HyperlinkState, InsertStatus, pluginKey } from "../../../plugins/link/pm/hyperlink"
import { EditorEvent } from "../../../lib/interfaces"
import { ConnectionPositionPair, Overlay, OverlayRef } from "@angular/cdk/overlay"
import { ComponentPortal } from "@angular/cdk/portal"
import { EditorTool, EditorToolbar } from "../../../lib/editor-toolbar/interfaces"
import { insertLink, removeLink, setLinkHref, setLinkText } from "../../../plugins/link/link.commands"
import { Observable, Subscription } from "rxjs"
import { Mark } from "prosemirror-model"
import { cascadeCommands } from "../../../plugins/alignment/alignment.command"
import { EditorService } from "../../../lib/editor.service"
import { fromEvent } from "rxjs/internal/observable/fromEvent"
import { take } from "rxjs/operators"
import { switchMap } from "rxjs/internal/operators/switchMap"
import { filter } from "rxjs/internal/operators/filter"

@Injectable()
export class FloatingToolbar implements EditorToolbar {
    viewChange: Observable<EditorEvent>
    stateChange: Observable<EditorEvent>
    editor: EditorService
    overlay: OverlayRef

    constructor(editor: EditorService, overlay: OverlayRef) {
        this.viewChange = editor.viewChange
        this.stateChange = editor.stateChange
        this.editor = editor
        this.overlay = overlay
    }

    runTool(tool: EditorTool): void {
        this.editor.runTool(tool)
    }

    returnFocusToEditor(): void {
        this.editor.view.focus()
    }
}

export const removeLinkTool: EditorTool = {
    tooltip: 'Remove Link',
    icon: 'fa-unlink',
    run: (state, dispatch) => {
        const pluginState: HyperlinkState = pluginKey.getState(state)
        if (pluginState.activeLinkMark.type === InsertStatus.EDIT_LINK_TOOLBAR) {
            return removeLink(pluginState.activeLinkMark.pos)(state, dispatch)
        }
    }
}

@Component({
    selector: "z-link-panel",
    template: `
        <mat-form-field *ngIf="!wrapLinkAroundText">
            <input matInput placeholder="Link Text" [value]="linkText" (input)="linkText = $event.target.value" />
        </mat-form-field>
        <mat-form-field>
            <input matInput placeholder="URL" [value]="url" (input)="url = $event.target.value" spellcheck="false" />
        </mat-form-field>
        <ng-container *ngIf="insert">
            <z-editor-toolbar-button [tool]="insertLink"></z-editor-toolbar-button>
        </ng-container>
        <ng-container *ngIf="!insert">
            <z-editor-toolbar-button [tool]="openLink"></z-editor-toolbar-button>
            <z-editor-toolbar-button [tool]="removeLink"></z-editor-toolbar-button>
        </ng-container>
    `,
    styleUrls: ["./link-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPanelComponent implements OnDestroy {
    public insertLink: EditorTool
    public openLink: EditorTool
    public removeLink: EditorTool
    public url: string
    public linkText: string
    public insert: boolean
    public wrapLinkAroundText: boolean

    private toolbar: FloatingToolbar
    private cdr: ChangeDetectorRef
    private sub: Subscription
    private el: ElementRef<HTMLElement>

    constructor(toolbar: FloatingToolbar, cdr: ChangeDetectorRef, el: ElementRef) {
        this.cdr = cdr
        this.url = ''
        this.insertLink = {
            tooltip: 'Add Link',
            icon: 'fa-link',
            run: (state, dispatch) => {
                const pluginState: HyperlinkState = pluginKey.getState(state)
                if (pluginState.activeLinkMark.type === InsertStatus.EDIT_LINK_TOOLBAR) {
                    const pos = pluginState.activeLinkMark.pos

                    return cascadeCommands([
                        setLinkHref(this.url, pos),
                        setLinkText(this.linkText, pos),
                    ])(state, dispatch)
                }
                if (pluginState.activeLinkMark.type === InsertStatus.INSERT_LINK_TOOLBAR) {
                    const { from, to } = pluginState.activeLinkMark

                    return insertLink(from, to, this.url, this.linkText || this.url)(state, dispatch)
                }
            }
        }
        this.removeLink = removeLinkTool
        this.el = el

        this.openLink = {
            tooltip: 'Open Link',
            icon: 'fa-external-link-alt',
            run: () => {
                window.open(this.url, '_blank')
                return false
            }
        }

        this.toolbar = toolbar

        this.sub = toolbar.stateChange.subscribe((editor) => {
            const pluginState: HyperlinkState = pluginKey.getState(editor.state)
            const linkMark = editor.state.schema.marks.link;

            switch (pluginState.activeLinkMark.type) {
                case InsertStatus.EDIT_LINK_TOOLBAR: {
                    const mark = linkMark.isInSet(pluginState.activeLinkMark.node.marks) as Mark
                    this.url = mark.attrs.href.trim()
                    this.linkText = pluginState.activeLinkMark.node.text.trim()
                    this.insert = false
                    this.wrapLinkAroundText = true

                    break
                }
                case InsertStatus.INSERT_LINK_TOOLBAR: {
                    this.url = ''
                    this.linkText = ''
                    this.insert = true
                    this.wrapLinkAroundText = pluginState.activeLinkMark.from !== pluginState.activeLinkMark.to

                    break
                }
                default:
            }

            this.cdr.markForCheck()
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    @HostListener('keydown.enter', ['$event'])
    handleEnter(event) {
        event.preventDefault()
        this.setLink()
        this.toolbar.returnFocusToEditor()
    }

    @HostListener('keydown.esc')
    handleEsc() {
        this.toolbar.returnFocusToEditor()
    }

    @HostListener('document:mousedown', ['$event.target'])
    handleGlobalClick(target: Element) {
        if (!this.el.nativeElement.contains(target)) {
            this.setLink()
        }
    }

    setLink() {
        this.toolbar.runTool(this.insertLink)
    }
}

export function attachLinkPanel(componentFactoryResolver: ComponentFactoryResolver, overlay: Overlay, parentInjector: Injector) {
    const overlayRef = overlay.create()

    return (editor: EditorService) => {
        const pluginState: HyperlinkState = pluginKey.getState(editor.state)
        const { link } = editor.state.schema.marks
        let origin
        let previousOrigin

        if (!pluginState.activeLinkMark || !link) {
            overlayRef.detach()
            return
        }

        const toolbar = new FloatingToolbar(editor, overlayRef)
        const injector = Injector.create({
            parent: parentInjector,
            providers: [{
                provide: FloatingToolbar,
                useValue: toolbar
            },{
                provide: EditorToolbar,
                useValue: toolbar
            }]
        })
        const linkPanelPortal = new ComponentPortal(LinkPanelComponent, null, injector);
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];

        switch (pluginState.activeLinkMark.type) {
            case InsertStatus.EDIT_LINK_TOOLBAR: {
                const el = editor.view.nodeDOM(pluginState.activeLinkMark.pos)
                origin = el.parentElement as HTMLElement

                break
            }
            case InsertStatus.INSERT_LINK_TOOLBAR: {
                const el = editor.view.domAtPos(pluginState.activeLinkMark.from)
                origin = el.node as HTMLElement
                break
            }
            default:
        }

        if (previousOrigin !== origin) {
            overlayRef.detach()
        }

        if (!overlayRef.hasAttached()) {
            overlayRef.attach(linkPanelPortal)

            const strategy = overlay.position()
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
