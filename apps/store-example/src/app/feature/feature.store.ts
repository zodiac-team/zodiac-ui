import { select, setState, Store } from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { from, ObservableInput, OperatorFunction, timer } from "rxjs"
import { filter, mapTo, switchMap, take } from "rxjs/operators"

export interface FeatureState {
    count: number
    test: boolean
}

export const initialState: FeatureState = {
    count: 0,
    test: true,
}

@Injectable()
export class FeatureEffectsContext {
    constructor(public store: Store<FeatureState>) {}
}

export function switchMapToLatestFrom<T>(observable: ObservableInput<T>): OperatorFunction<any, T> {
    const lastestFrom = from(observable)
    return function (source) {
        return source.pipe(
            switchMap(() => lastestFrom.pipe(take(1)))
        )
    }
}

function countdown(ctx: FeatureEffectsContext) {
    return ctx.store.pipe(
        select((state) => state.count),
        filter(count => count > 0),
        switchMap((count) => timer(1000).pipe(mapTo(count))),
        setState(ctx.store, (state, count) => ({
            count: count - 1
        })),
    )
}

export const featureEffects = [countdown]
