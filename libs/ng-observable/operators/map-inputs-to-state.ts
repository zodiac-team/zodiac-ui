import { Observable } from "rxjs"
import { NgHooksEvent } from "../lib/interfaces"
import { ngOnChanges } from "./ng-on-changes"
import { map, mapTo } from "rxjs/operators"

function defaultMapFn<T>(value?: T): any {
    return value
}

export function mapInputsToState<T extends any, U>(
    source: Observable<NgHooksEvent<T>>,
    mapFn: (value?: T) => U = defaultMapFn,
) {
    return ngOnChanges(source).pipe(
        mapTo(source),
        map(valueRef => {
            return mapFn(Object.create(valueRef))
        }),
    )
}
