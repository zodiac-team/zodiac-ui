import { ObservableInput } from "rxjs"
import { Type } from "@angular/core"

export interface Effect {
    type: EffectFactory,
    payload: any
}

export type EffectFactory = (ctx?: any) => ObservableInput<any>

export interface EffectsConfig {
    context: Type<any>
}

export interface EffectsProvider {
    config: EffectsConfig
    effects: EffectFactory[]
}
