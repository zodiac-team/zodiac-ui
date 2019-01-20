import { createConnector, createFeatureSelector, InitialState, Store } from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { interval } from "rxjs"
import { setState } from "@zodiac-ui/store"
import { createSelector } from "reselect"
import { filter } from "rxjs/operators"
import { select } from "@zodiac-ui/store"

export interface FeatureState {
    count: number
    test: boolean
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
        test: true,
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
        select(() => ctx.store.state.count),
        filter(count => count > 0),
        setState(ctx.store, state => {
            state.count = state.count - 1
        }),
    )
})
