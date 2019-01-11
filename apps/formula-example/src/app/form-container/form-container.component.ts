import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core"

@Component({
    selector: "z-form-container",
    template: `
        <z-form> <z-formula-outlet></z-formula-outlet> </z-form>
    `,
    styleUrls: ["./form-container.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
