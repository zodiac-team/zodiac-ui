import { ModuleWithProviders, NgModule } from "@angular/core"
import { EditorComponent } from "./editor.component"
import { EDITOR_OPTIONS } from "./constants"
import { EditorOptions } from "./interfaces"

@NgModule({
    declarations: [EditorComponent],
    exports: [EditorComponent],
    providers: [],
})
export class EditorModule {
    static config(options: EditorOptions): ModuleWithProviders {
        return {
            ngModule: EditorModule,
            providers: [
                {
                    provide: EDITOR_OPTIONS,
                    useValue: options,
                },
            ],
        }
    }
}
