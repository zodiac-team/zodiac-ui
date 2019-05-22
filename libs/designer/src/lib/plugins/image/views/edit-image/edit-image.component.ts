import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-edit-image",
    template: `
        <p>
            edit-image works!
        </p>
    `,
    styleUrls: ["./edit-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditImageComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
