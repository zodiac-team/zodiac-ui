import { EFFECTS } from "./constants"
import { EffectFactory, EffectsConfig } from "./interfaces"

export function provideEffects(effects: EffectFactory[], config: EffectsConfig) {
    return [{
        provide: EFFECTS,
        useValue: {
            effects: effects,
            config: config
        },
        multi: true
    }, config && config.context]
}
