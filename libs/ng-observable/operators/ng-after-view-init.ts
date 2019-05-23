import { filterByEvent } from "../lib/internals/filter-by-event"
import { NgHooksEvent } from "../lib/interfaces"
import { Observable } from "rxjs"
import { NgHooksEventType } from "../lib/constants"

export function ngAfterViewInit<T extends any>(
    source: Observable<NgHooksEvent<T>>,
): Observable<void> {
    return filterByEvent<void>(NgHooksEventType.ngAfterViewInit)(source)
}
