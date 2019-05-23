import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-add-blocks-panel",
    template: `
        <p>
            add-blocks-panel works!
        </p>
    `,
    styleUrls: ["./add-blocks-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBlocksPanelComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
