import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: "z-ipad-device",
    template: `
        <div class="md-ipad md-black-device">
            <div class="md-body">
                <div class="md-front-camera"></div>
                <div class="md-screen">
                    <ng-content></ng-content>
                </div>

                <button class="md-home-button"></button>
            </div>
        </div>
    `,
    styleUrls: ["./ipad-device.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IpadDeviceComponent {}
