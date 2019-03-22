import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core"
import { EditorService } from "./editor.service"

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
        <button (click)="sendCommand()">Align Right</button>
        <div #editorRef></div>
    `,
    styleUrls: ["./editor.component.scss"],
    viewProviders: [EditorService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
    @Input()
    public doc: any

    @ViewChild("editorRef")
    public editorRef: ElementRef<HTMLDivElement>

    private editor: EditorService

    constructor(editor: EditorService) {
        this.editor = editor
        this.doc = defaultDoc
    }

    public ngOnInit() {
        this.editor.createEditorState(this.doc)
        this.editor.createEditorView(this.editorRef.nativeElement)
    }

    public sendCommand(command) {
        this.editor.sendCommand(command)
    }
}
