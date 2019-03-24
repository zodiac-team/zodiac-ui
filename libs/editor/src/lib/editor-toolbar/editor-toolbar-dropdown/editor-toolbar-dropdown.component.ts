import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core"
import { EditorTool, EditorToolbar, EditorToolGroup } from "../interfaces"

@Component({
    selector: "z-editor-toolbar-dropdown",
    template: `
        <button mat-icon-button [matMenuTriggerFor]="dropdown" [matTooltip]="group.tooltip">
            <mat-icon [textContent]="menu.icon"></mat-icon>
        </button>
        <mat-menu #dropdown>
            <button mat-icon-button *ngFor="let tool of group.tools" (click)="runTool(tool)" [matTooltip]="tool.tooltip">
                <mat-icon [textContent]="tool.icon"></mat-icon>
            </button>
        </mat-menu>
    `,
    styleUrls: ["./editor-toolbar-dropdown.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarDropdownComponent implements OnInit {
    @Input()
    public group: EditorToolGroup

    public menu: EditorTool | EditorToolGroup

    private toolbar: EditorToolbar
    private cdr: ChangeDetectorRef

    constructor(toolbar: EditorToolbar, cdr: ChangeDetectorRef) {
        this.toolbar = toolbar
        this.cdr = cdr
    }

    ngOnInit() {
        this.menu = this.group
        this.toolbar.stateChange.subscribe(editor => {
            this.menu = this.group.tools.find(tool => tool.select(editor.state)) || this.group
            this.cdr.markForCheck()
        })
    }

    runTool(tool: EditorTool) {
        this.toolbar.runTool(tool)
    }
}
