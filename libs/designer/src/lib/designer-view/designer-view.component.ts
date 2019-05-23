import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: "z-designer-view",
    template: `
        <div class="z-canvas">
            <z-ipad-device class="z-preview-window">
                <ng-content></ng-content>
            </z-ipad-device>
        </div>
    `,
    styleUrls: ["./designer-view.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class DesignerViewComponent {}
