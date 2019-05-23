import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core"
import { EditorTool, EditorToolbar, EditorToolGroup } from "../interfaces"

@Component({
    selector: "z-editor-toolbar-select",
    template: `
        <mat-form-field>
            <mat-select
                [value]="selected"
                [placeholder]="group.label"
                (selectionChange)="runTool($event.value)"
            >
                <mat-select-trigger>
                    <span [textContent]="selected.label"></span>
                </mat-select-trigger>
                <mat-option *ngFor="let tool of group.tools" [value]="tool">
                    <span [textContent]="tool.label"></span>
                </mat-option>
            </mat-select>
        </mat-form-field>
    `,
    styleUrls: ["./editor-toolbar-select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarSelectComponent implements OnInit {
    @Input()
    public group: EditorToolGroup

    public selected: EditorTool | EditorToolGroup

    private toolbar: EditorToolbar
    private cdr: ChangeDetectorRef

    constructor(toolbar: EditorToolbar, cdr: ChangeDetectorRef) {
        this.toolbar = toolbar
        this.cdr = cdr
    }

    public ngOnInit() {
        this.selected = this.group
        this.toolbar.stateChange.subscribe(editor => {
            this.selected =
                this.group.tools.find(option => option.select(editor.state)) || this.group
            this.cdr.detectChanges()
        })
    }

    public runTool(tool: EditorTool) {
        this.toolbar.runTool(tool)
    }
}
