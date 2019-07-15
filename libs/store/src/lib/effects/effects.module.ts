import { ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EffectFactory, EffectsConfig } from "./interfaces"
import { Effects, StoreEffects } from "./effects.service"
import { provideEffects } from "./providers"

@NgModule({
    imports: [CommonModule],
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

    static forChild(effects: EffectFactory[], options?: EffectsConfig) {
        return {
            ngModule: EffectsModule,
            providers: [StoreEffects, provideEffects(effects, options)],
        }
    }

    constructor(effects: StoreEffects) {
        effects.run()
    }
}
