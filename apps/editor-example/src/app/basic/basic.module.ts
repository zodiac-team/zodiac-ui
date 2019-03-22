import { NgModule } from "@angular/core"
import { BasicEditorModule } from "@zodiac-ui/editor"
import { BasicComponent } from "./basic.component"

@NgModule({
    imports: [BasicEditorModule],
    exports: [BasicComponent],
    declarations: [BasicComponent],
    providers: [],
})
export class BasicModule {}
