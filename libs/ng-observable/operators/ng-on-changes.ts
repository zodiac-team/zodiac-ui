import { Observable } from "rxjs"

import { filterByEvent } from "../lib/internals/filter-by-event"
import { NgHooksEvent, TypedChanges } from "../lib/interfaces"
import { NgHooksEventType } from "../lib/constants"

export function ngOnChanges<T extends any>(
    source: Observable<NgHooksEvent<T>>,
): Observable<TypedChanges<T>> {
    return filterByEvent<TypedChanges<T>>(NgHooksEventType.ngOnChanges)(source)
}
