import { createConnector, createFeatureSelector, InitialState, Store } from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { interval } from "rxjs"
import { setState } from "@zodiac-ui/store"
import { createSelector } from "reselect"

export interface FeatureState {
    count: number
    computedValue: number
}

export const $feature = createFeatureSelector<FeatureState>()

export const $computedValue = createSelector(
    $feature,
    state => state.count * -1,
)

export function initialState(): InitialState<FeatureState> {
    return {
        count: 0,
        computedValue: $computedValue,
    }
}

@Injectable()
export class FeatureEffects {
    static connect = createConnector<FeatureEffects>()
    constructor(public store: Store<FeatureState>) {}
}

FeatureEffects.connect(ctx => {
    return interval(1000).pipe(
        setState(ctx.store, (_, state) => {
            state.count = Math.max(0, state.count - 1)
        }),
    )
})
