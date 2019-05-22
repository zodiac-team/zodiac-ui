import { ComponentFactoryResolver, InjectionToken, Injector, NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { hyperlinkPlugin } from "./link.plugin"

@NgModule({
    providers: [
        {
            provide: EDITOR_PLUGIN,
            useFactory: hyperlinkPlugin,
            deps: [ComponentFactoryResolver],
            multi: true,
        },
    ],
})
export class LinkModule {}
