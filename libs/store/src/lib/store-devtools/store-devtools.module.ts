import { ModuleWithProviders, NgModule } from "@angular/core"
import { StoreDevtoolsService } from "./store-devtools.service"
import { STORE_DEVTOOLS_CONFIG, STORE_DEVTOOLS_EXTENSION } from "./constants"
import { createDevtoolsExtension } from "./devtools-extension"
import { StoreDevtoolsConfig } from "./interfaces"

@NgModule({
    providers: [StoreDevtoolsService],
})
export class StoreDevtoolsModule {
    static config(config: StoreDevtoolsConfig): ModuleWithProviders {
        return {
            ngModule: StoreDevtoolsModule,
            providers: [
                {
                    provide: STORE_DEVTOOLS_CONFIG,
                    useValue: config,
                },
                {
                    provide: STORE_DEVTOOLS_EXTENSION,
                    useFactory: createDevtoolsExtension,
                    deps: [STORE_DEVTOOLS_CONFIG],
                },
            ],
        }
    }

    constructor(devtools: StoreDevtoolsService) {
        devtools.run()
    }
}
