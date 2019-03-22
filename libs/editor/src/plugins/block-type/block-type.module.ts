import { InjectionToken, NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { blockTypePlugin } from "./block-type.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: blockTypePlugin,
        multi: true
    }],
})
export class BlockTypeModule {}
