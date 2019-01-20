import { combineLatest, Observable, Subject } from "rxjs"
import { Selector } from "reselect"
import { distinctUntilChanged, map } from "rxjs/operators"
import { Computed, StoreLike } from "./interfaces"
import { select, setState } from "./operators"

export function OfType<T extends { new (...args: any[]): {} }>(type: string) {
    return function(constructor) {
        return class extends constructor {
            static type = type
            type = type

            constructor(...args: any[]) {
                super(...args)
            }
        } as typeof constructor
    }
}

export function isRecipe<T>(setter): setter is (draft: T) => any {
    return typeof setter === "function"
}

export function compute<T, R>(
    store: StoreLike<T>,
    state$: Subject<T>,
    computed: Computed<T>,
): Observable<any> {
    const values = Object.keys(computed)
        .filter(key => typeof computed[key] === "function")
        .map((key): [string, Selector<T, R>] => [key, computed[key]])

    const obs = values.map(([key, selector]) => {
        return state$.pipe(
            select(selector),
            distinctUntilChanged(),
            map(value => [key, value]),
        )
    })

    return combineLatest(obs).pipe(
        setState(store, (state, computedValues) => {
            computedValues.forEach(([key, value]) => {
                state[key] = value
            })
        }),
    )
}
