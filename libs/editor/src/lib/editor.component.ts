import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewEncapsulation,
} from "@angular/core"
import { EditorService } from "./editor.service"
import { Editor, EditorEvent } from "./interfaces"
import { EditorTool } from "./editor-toolbar/interfaces"
import { Observable } from "rxjs"

export function hasChanges(change: SimpleChange) {
    return change && change.previousValue !== change.currentValue
}

@Component({
    selector: "z-editor",
    template: `
        <!-- use host -->
    `,
    styleUrls: ["./editor.component.scss"],
    viewProviders: [EditorService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit, OnChanges {
    @Input()
    public state: any

    @Output()
    public viewChange: Observable<EditorEvent>

    @Output()
    public stateChange: Observable<EditorEvent>

    private editorRef: ElementRef<HTMLElement>

    private editor: EditorService

    constructor(editor: EditorService, editorRef: ElementRef<HTMLElement>) {
        this.editor = editor
        this.viewChange = editor.viewChange
        this.stateChange = editor.stateChange
        this.editorRef = editorRef
    }

    public ngOnInit() {
        this.editor.createEditorState(this.state)
        this.editor.createEditorView(this.editorRef.nativeElement)
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (hasChanges(changes.state)) {
            this.editor.updateState(this.state)
        }
    }

    public runTool(command: EditorTool) {
        this.editor.runTool(command)
    }
}
