import { ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { STORE_EFFECTS } from "../constants"
import { Effects, EffectsProvider, EffectsService } from "./effects.service"

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [],
})
export class EffectsModule {
    static forRoot(effects: EffectsProvider[]): ModuleWithProviders {
        return {
            ngModule: EffectsModule,
            providers: [
                EffectsService,
                Effects,
                effects,
                {
                    provide: STORE_EFFECTS,
                    useValue: effects,
                },
            ],
        }
    }

    constructor(effects: EffectsService) {
        effects.runEffects()
    }
}
