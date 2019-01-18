import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { STORE_EFFECTS, STORE_EFFECTS_OBSERVER } from "../constants"
import { Effects, EffectsProvider, EffectsService } from "./effects.service"
import { Subject } from "rxjs"

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
                Effects,
                provideEffects(effects),
                {
                    provide: STORE_EFFECTS_OBSERVER,
                    useClass: Subject,
                },
            ],
        }
    }

    static forChild(effects: EffectsProvider[]) {
        return {
            ngModule: EffectsModule,
            providers: [provideEffects(effects)],
        }
    }

    constructor(effects: EffectsService) {
        effects.runEffects()
    }
}

export function provideEffects(effects: EffectsProvider[]) {
    return [
        EffectsService,
        effects,
        {
            provide: STORE_EFFECTS,
            useValue: effects,
        },
    ]
}
