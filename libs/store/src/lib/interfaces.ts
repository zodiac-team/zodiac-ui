import { Observable } from "rxjs"
import { Store } from "./store.service"
import { Type } from "@angular/core"
import { Selector } from "reselect"

export interface Feature {
    name: string
    path: any
}

export interface StoreContext<T> {
    $implicit: T
}

export interface Action {
    type?: string
}

export interface ActionType<T extends any> extends Type<T> {
    type: T["type"]
}

export type ConnectFnWithContext<T, U extends any> = (store: Store<T>, ctx?: U) => Observable<any>
export type ConnectFactoryWithContext<T, U> = (
    fn: ConnectFnWithContext<T, U>,
    name?: string,
) => ConnectFnWithContext<T, U>

export interface Connector<T, U> {
    connect(connectFn: ConnectFnWithContext<T, U>, type?: string): ConnectFnWithContext<T, U>
}

export type StateSetter<T> = Partial<T> | ((draft: T) => any)
export type StateSetterWithContext<T, U> = Partial<T> | ((ctx: U, draft: T) => any)

export interface StoreLike<T> extends Observable<StoreLike<T>> {
    state: T
    select<R>(selector: Selector<T, R>): Observable<R>
    dispatch(action: any): void
    setState(setter: StateSetter<T>): void
}
