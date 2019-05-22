import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-designer-menu",
    template: `
        <mat-toolbar>
            <button mat-button>
                <span>File</span>
            </button>
            <button mat-button>
                <span>Edit</span>
            </button>
            <button mat-button>
                <span>View</span>
            </button>
            <button mat-button>
                <span>Tools</span>
            </button>
            <button mat-button>
                <span>Help</span>
            </button>
        </mat-toolbar>
    `,
    styleUrls: ["./designer-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignerMenuComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
