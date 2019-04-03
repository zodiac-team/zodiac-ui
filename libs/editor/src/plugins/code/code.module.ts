import { Inject, ModuleWithProviders, NgModule, Optional } from "@angular/core"
import { EDITOR_PLUGIN } from "../../lib/constants"
import { codeBlockPlugin } from "./code.plugin"
import { globalConfig, modeInfo } from "./codemirror"
import { CodeModuleConfig } from "./interfaces"
import { CODE_CONFIG } from "./constants"

@NgModule({
    providers: [{
        provide: EDITOR_PLUGIN,
        useValue: codeBlockPlugin(),
        multi: true
    }],
})
export class CodeModule {
    constructor(@Optional() @Inject(CODE_CONFIG) config: any) {
        if (config.extraModes) {
            modeInfo.push(...config.extraModes)
        }
        if (config.modeURL) {
            Object.assign(globalConfig, config)
        }
    }

    static configure(config: CodeModuleConfig): ModuleWithProviders {
        return {
            ngModule: CodeModule,
            providers: [{
                provide: CODE_CONFIG,
                useValue: config
            }]
        }
    }
}
