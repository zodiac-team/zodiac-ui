import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core"
import { EditorService } from "./editor.service"
import { Editor } from "./interfaces"
import { EditorTool } from "./editor-toolbar/interfaces"
import { Observable } from "rxjs"

const defaultDoc = {
    "content": [
        {
            "content":
                [
                    {
                        "text": "This area is dedicated to my personal book notes that Im electing to publicly share via Project AMPLE.",
                        "type": "text",
                    },
                ],
            "type": "paragraph",
        },
    ],
    "type": "doc",
}

@Component({
    selector: "z-editor",
    template: `
        <div #editorRef></div>
    `,
    styleUrls: ["./editor.component.scss"],
    viewProviders: [EditorService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit, Editor {
    @Input()
    public doc: any

    @Output()
    public docChange: Observable<any>

    @Output()
    public stateChange: Observable<any>

    @ViewChild("editorRef")
    public editorRef: ElementRef<HTMLDivElement>

    private editor: EditorService

    constructor(editor: EditorService) {
        this.editor = editor
        this.doc = defaultDoc
        this.docChange = editor.docChange
        this.stateChange = editor.stateChange
    }

    public ngOnInit() {
        this.editor.createEditorState(this.doc)
        this.editor.createEditorView(this.editorRef.nativeElement)
    }

    public runTool(command: EditorTool) {
        this.editor.runTool(command)
    }
}
