import { map, mapTo } from "rxjs/operators"
import { ngOnChanges } from "./lifecycle"

function defaultMapFn<T>(value?: T): any {
    return value
}

export function mapInputsToState<T, U>(source: any, mapFn: (value?: T) => U = defaultMapFn) {
    return ngOnChanges(source).pipe(
        mapTo(Object.create(source)),
        map(mapFn)
    )
}

