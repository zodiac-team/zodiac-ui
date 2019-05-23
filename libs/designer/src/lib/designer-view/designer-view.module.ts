import { NgModule } from "@angular/core"
import { DesignerViewComponent } from "./designer-view.component"
import { DeviceModule } from "../device/device.module"

@NgModule({
    declarations: [DesignerViewComponent],
    imports: [DeviceModule],
    exports: [DesignerViewComponent],
})
export class DesignerViewModule {}
