import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-form-field",
    template: `
        <p>
            form-field works!
        </p>
    `,
    styleUrls: ["./form-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
