import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core"
import { Editor } from "../interfaces"
import { EditorTool, EditorToolbar } from "./interfaces"
import { Subject } from "rxjs"

@Component({
    selector: "z-editor-toolbar",
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ["./editor-toolbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: EditorToolbar,
            useExisting: EditorToolbarComponent,
        },
    ],
})
export class EditorToolbarComponent implements OnInit, EditorToolbar {
    @Input()
    public editor: Editor

    public viewChange: Subject<any>
    public stateChange: Subject<any>

    constructor() {
        this.viewChange = new Subject()
        this.stateChange = new Subject()
    }

    public ngOnInit() {
        this.editor.viewChange.subscribe(this.viewChange)
        this.editor.stateChange.subscribe(this.stateChange)
    }

    public runTool(tool: EditorTool) {
        if (this.editor) {
            this.editor.runTool(tool)
        }
    }
}
