import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core"

@Component({
    selector: "z-form-container",
    template: `
        <z-form class="z-form-container-form"> <z-formula-outlet></z-formula-outlet> </z-form>
    `,
    styleUrls: ["./form-container.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "z-form-container"
    }
})
export class FormContainerComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
