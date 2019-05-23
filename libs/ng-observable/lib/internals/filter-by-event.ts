import { NgHooksEvent, TypedChanges } from "../interfaces"
import { NgHooksEventType } from "../constants"
import { pipe } from "rxjs"
import { filter, map, take } from "rxjs/operators"

export function filterByEvent<
    T extends TypedChanges<V> | void = void,
    U extends NgHooksEventType = NgHooksEventType,
    V extends any = any
>(hook: U, once?: boolean) {
    const eventFilter = pipe(
        filter<NgHooksEvent<V>>(source => source[0] === hook),
        map(source => source[1] as T),
    )
    return once
        ? pipe(
              eventFilter,
              take(1),
          )
        : eventFilter
}
