import { InjectionToken, NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { textPlugin } from "./text.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: textPlugin,
        multi: true
    }],
})
export class TextModule {}
