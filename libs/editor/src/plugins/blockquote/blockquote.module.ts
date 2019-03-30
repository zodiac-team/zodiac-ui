import { NgModule } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { blockquotePlugin } from "./blockquote.plugin"

@NgModule({
    providers: [
        {
            provide: EDITOR_PLUGIN,
            useValue: blockquotePlugin,
            multi: true,
        },
    ],
})
export class BlockquoteModule {}
