import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { docPlugin } from "./doc.plugin"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: docPlugin,
        multi: true
    }],
})
export class DocModule {}
