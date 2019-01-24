import { Selector } from "reselect"
import { Observable, OperatorFunction } from "rxjs"
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators"
import { Type } from "@angular/core"
import { ConnectFnWithContext, StateSetterWithContext, StoreLike } from "./interfaces"
import { Effect } from "./effects/effects.service"

export function select<T, R>(selector: Selector<T, R>): OperatorFunction<T, R> {
    return function(source$) {
        return source$.pipe(
            map(state => selector(state)),
            distinctUntilChanged(),
        )
    }
}

export function ofAction<T>(actionType: Type<T>): OperatorFunction<any, T> {
    return function(source$) {
        return source$.pipe(
            filter(action => {
                if (actionType.hasOwnProperty("type")) {
                    return action.type === (actionType as any).type
                } else {
                    throw new Error(
                        `Action missing static property "type". Did you forget the @OfType() decorator?`,
                    )
                }
            }),
        )
    }
}

export function ofEffect<T, U>(
    effect: ConnectFnWithContext<T, Observable<U>>,
): OperatorFunction<Effect<T, Observable<U>>, U> {
    return function(source$) {
        return source$.pipe(
            filter(source => source.source === effect),
            map(source => source.value),
        ) as any
    }
}

export function dispatch<T>(
    store: StoreLike<T>,
    action: any | ((state: T) => any),
): OperatorFunction<T, T> {
    return function(source$) {
        return source$.pipe(
            tap(() => {
                const value = typeof action === "function" ? action(store) : action
                store.dispatch(value)
            }),
        )
    }
}

export function withLatestState<T, U>(store: StoreLike<T>): OperatorFunction<U, [U, T]> {
    return function(source$) {
        return source$.pipe(
            map<U, [U, T]>(source => {
                return [source, store.state]
            }),
        )
    }
}

export function setState<T extends Observable<V>, U, V>(
    store: StoreLike<U>,
    setter: StateSetterWithContext<U, V>,
): OperatorFunction<V, V> {
    return function(source$) {
        return source$.pipe(
            tap(source => {
                let stateSetter

                if (typeof setter === "function") {
                    stateSetter = state => setter(state, source)
                }

                store.setState(stateSetter)
            }),
        )
    }
}
