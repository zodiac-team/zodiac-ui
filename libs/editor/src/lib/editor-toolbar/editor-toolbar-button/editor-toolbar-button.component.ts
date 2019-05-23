import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnInit,
} from "@angular/core"
import { EditorTool, EditorToolbar } from "../interfaces"

@Component({
    selector: "z-editor-toolbar-button",
    template: `
        <button mat-icon-button [matTooltip]="tool.tooltip" (click)="runTool(tool)">
            <mat-icon fontSet="fa" [fontIcon]="tool.icon"></mat-icon>
        </button>
    `,
    styleUrls: ["./editor-toolbar-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarButtonComponent implements OnInit {
    @Input()
    public tool: EditorTool

    @HostBinding("class.active")
    public active: boolean

    private toolbar: EditorToolbar
    private cdr: ChangeDetectorRef

    constructor(toolbar: EditorToolbar, cdr: ChangeDetectorRef) {
        this.toolbar = toolbar
        this.cdr = cdr
    }

    public ngOnInit() {
        this.toolbar.stateChange.subscribe(editor => {
            if (this.tool.active) {
                this.active = this.tool.active(editor.state)
            }
            this.cdr.markForCheck()
        })
    }

    public runTool(tool: EditorTool) {
        this.toolbar.runTool(tool)
    }
}
