import { filterByEvent } from "../lib/internals/filter-by-event"
import { NgHooksEvent } from "../lib/interfaces"
import { Observable } from "rxjs"
import { NgHooksEventType } from "../lib/constants"

export function ngOnDestroy<T extends any>(source: Observable<NgHooksEvent<T>>): Observable<void> {
    return filterByEvent<void>(NgHooksEventType.ngOnDestroy)(source)
}
