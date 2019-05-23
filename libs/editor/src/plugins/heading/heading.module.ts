import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { headingPlugin } from "./heading.plugin"

@NgModule({
    providers: [
        {
            provide: EDITOR_PLUGIN,
            useValue: headingPlugin,
            multi: true,
        },
    ],
})
export class HeadingModule {}
