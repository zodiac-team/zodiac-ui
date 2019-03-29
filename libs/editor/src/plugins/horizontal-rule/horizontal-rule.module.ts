import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { horizontalRulePlugin } from "./horizontal-rule.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: horizontalRulePlugin,
        multi: true
    }]
})
export class HorizontalRuleModule { }
