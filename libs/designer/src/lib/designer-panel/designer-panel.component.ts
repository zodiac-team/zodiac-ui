import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"

@Component({
    selector: "z-designer-panel",
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ["./designer-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignerPanelComponent implements OnInit {
    ngOnInit() {}
}
