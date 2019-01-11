import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

@Component({
    selector: "z-presentation-container",
    template: `
        <z-formula-outlet></z-formula-outlet>
    `,
    styleUrls: ["./presentation-container.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationContainerComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
