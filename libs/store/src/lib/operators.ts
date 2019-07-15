import { Observable, OperatorFunction } from "rxjs"
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators"
import {
    Action,
    ActionFactory,
    ActionPayload, ActionType,
    PartialValue,
    PartialValueFnWithContext,
    Selector,
    StoreLike,
} from "./interfaces"

export function select<T, R>(selector: Selector<T, R>): OperatorFunction<T, R> {
    return function(source$) {
        return source$.pipe(
            map(state => selector(state)),
            distinctUntilChanged(),
        )
    }
}

export function setState<T extends Observable<V>, U, V>(
    store: StoreLike<U>,
    setter: PartialValue<U> | PartialValueFnWithContext<U, V>,
): OperatorFunction<V, V> {
    return function(source$) {
        return source$.pipe(
            tap(source => {
                if (typeof setter === "function") {
                    store.next(setter, source)
                } else {
                    store.next(setter)
                }
            }),
        )
    }
}

export function ofAction<T extends Action | ActionFactory>(action: T): OperatorFunction<Action, T extends ActionFactory ? ReturnType<T> : T> {
    return function (source) {
        return source.pipe(
            filter<T extends ActionFactory ? ReturnType<T> : T>((ctx) => ctx.type === action.type),
        )
    }
}
