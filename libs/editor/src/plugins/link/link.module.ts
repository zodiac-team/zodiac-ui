import { ComponentFactoryResolver, InjectionToken, Injector, NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { hyperlinkPlugin } from "./link.plugin"

export const NG_NODE_VIEW = new InjectionToken("NG_NODE_VIEW")

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useFactory: hyperlinkPlugin,
        deps: [ComponentFactoryResolver],
        multi: true
    }]
})
export class LinkModule { }
