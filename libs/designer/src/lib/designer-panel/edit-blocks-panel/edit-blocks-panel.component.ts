import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-edit-blocks-panel",
    template: `
        <p>
            edit-blocks-panel works!
        </p>
    `,
    styleUrls: ["./edit-blocks-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBlocksPanelComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
