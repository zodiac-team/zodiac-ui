import { Observable } from "rxjs"
import { NgHooksEvent } from "../lib/interfaces"
import { ngOnChanges } from "./ng-on-changes"
import { map } from "rxjs/operators"

function defaultMapFn<T>(value: T): any {
    return value
}

export function mapInputsToState<T extends any, U>(
    source: Observable<NgHooksEvent<T>>,
    mapFn: (value: T) => U = defaultMapFn,
) {
    return ngOnChanges(source).pipe(
        map(changes =>
            mapFn(
                Object.entries(changes).reduce(
                    (partialState, [key, value]) => {
                        partialState[key] = value!.currentValue
                        return partialState
                    },
                    {} as T,
                ),
            ),
        ),
    )
}
