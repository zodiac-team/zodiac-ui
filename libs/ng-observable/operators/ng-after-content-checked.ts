import { filterByEvent } from "../lib/internals/filter-by-event"
import { Observable } from "rxjs"
import { NgHooksEvent } from "../lib/interfaces"
import { NgHooksEventType } from "../lib/constants"

export function ngAfterContentChecked<T extends any>(
    source: Observable<NgHooksEvent<T>>,
): Observable<void> {
    return filterByEvent<void>(NgHooksEventType.ngAfterContentChecked)(source)
}
