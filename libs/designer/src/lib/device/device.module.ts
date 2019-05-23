import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IpadDeviceComponent } from "./ipad-device/ipad-device.component"

@NgModule({
    declarations: [IpadDeviceComponent],
    exports: [IpadDeviceComponent],
    imports: [CommonModule],
})
export class DeviceModule {}
