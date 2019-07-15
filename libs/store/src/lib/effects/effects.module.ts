import { ModuleWithProviders, NgModule } from "@angular/core"
import { EffectFactory, EffectsConfig } from "./interfaces"
import { Effects, StoreEffects } from "./effects.service"
import { provideEffects } from "./providers"

@NgModule({
    imports: [],
    declarations: [],
    providers: [],
})
export class EffectsModule {
    static forRoot(effects: EffectFactory[], options?: EffectsConfig): ModuleWithProviders {
        return {
            ngModule: EffectsModule,
            providers: [
                StoreEffects,
                Effects,
                provideEffects(effects, options)
            ],
        }
    }

    static forChild(effects: EffectFactory[], options?: EffectsConfig): ModuleWithProviders {
        return {
            ngModule: EffectsModule,
            providers: [StoreEffects, provideEffects(effects, options)],
        }
    }

    constructor(effects: StoreEffects) {
        effects.run()
    }
}
