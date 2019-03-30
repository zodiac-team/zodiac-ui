import { InjectionToken, NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { basePlugin } from "./base.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: basePlugin,
        multi: true
    }],
})
export class BaseModule {}
