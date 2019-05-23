import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from "@angular/core"
import { EditorService } from "./editor.service"
import { Command } from "../../../../editor/src/lib/interfaces/command"
import { Observable } from "rxjs"
import { EditorEvent } from "./interfaces"

@Component({
    selector: "z-editor",
    template: `
        <!-- use host -->
    `,
    styleUrls: ["./editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
    private editor: EditorService
    private elementRef: ElementRef

    @Input()
    public state: any

    @Output()
    public stateChange: Observable<EditorEvent>

    @Output()
    public viewChange: Observable<EditorEvent>

    constructor(editor: EditorService, elementRef: ElementRef) {
        this.editor = editor
        this.elementRef = elementRef
        this.stateChange = editor.stateChange
        this.viewChange = editor.viewChange
    }

    public ngOnInit() {
        this.editor.create(this.elementRef.nativeElement, this.state)
    }

    public runCommand(command: Command) {
        this.editor.runCommand(command)
    }
}
