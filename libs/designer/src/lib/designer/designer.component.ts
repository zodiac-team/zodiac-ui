import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core"
import { Subject } from "rxjs"
import { IMAGE_PLUGIN_KEY } from "../plugins/image/constants"
import { DesignerViewComponent } from "../designer-view/designer-view.component"
import { PluginKey } from "prosemirror-state"
import { FormControl, FormGroup } from "@angular/forms"
import { insertImage } from "../plugins/image/commands/insert-image"
import { EditorService, provideEditor } from "../editor/editor.service"
import { EditorComponent } from "../editor/editor.component"
import { EditorEvent } from "../editor/interfaces"

@Component({
    selector: "z-designer",
    template: `
        <z-designer-menu class="z-menu"></z-designer-menu>
        <z-designer-panel class="z-left-panel">
            <mat-tab-group>
                <mat-tab label="Add Block">
                    <button mat-icon-button class="z-block" (click)="addBlock()">
                        <img src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" />
                    </button>
                </mat-tab>
                <mat-tab label="Templates"></mat-tab>
                <mat-tab label="Page"></mat-tab>
            </mat-tab-group>
        </z-designer-panel>
        <z-designer-view class="z-view">
            <z-editor class="z-editor" [state]="doc"></z-editor>
        </z-designer-view>
        <z-designer-panel class="z-right-panel">
            <z-node-panel></z-node-panel>
        </z-designer-panel>
    `,
    styleUrls: ["./designer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideEditor()],
})
export class DesignerComponent implements OnInit {
    public addBlock$: Subject<any>

    public model: any

    public form: FormGroup

    private cdr: ChangeDetectorRef

    public editor: EditorService

    @Input()
    public doc: any

    @Output()
    public save: EventEmitter<EditorEvent>

    constructor(cdr: ChangeDetectorRef, editor: EditorService) {
        this.addBlock$ = new Subject()
        this.model = null
        this.form = new FormGroup({
            src: new FormControl(""),
        })
        this.cdr = cdr
        this.editor = editor
        this.save = new EventEmitter()
    }

    public ngOnInit(): void {
        this.addBlock$.subscribe(block => {
            this.editor.runCommand(
                insertImage({
                    src: "https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif",
                }),
            )
        })

        this.editor.updateState(this.doc)
        this.editor.stateChange.subscribe(this.save)
    }

    public addBlock() {
        this.addBlock$.next({
            type: "img",
        })
    }
}
