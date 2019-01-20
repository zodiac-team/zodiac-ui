import { Observable } from "rxjs"
import { Selector } from "reselect"

export type Feature = string

export interface StoreContext<T> {
    $implicit: T
}

export interface Action {
    type?: string
}

export type ConnectFnWithContext<T, U> = (ctx: T) => U
export type ConnectFactoryWithContext<T, U extends ConnectFnWithContext<any, any>> = (
    fn: U,
    name?: string,
) => U

export type StateSetter<T> = Partial<T> | ((draft: T) => any)
export type StateSetterWithContext<T, U> = Partial<T> | ((draft: T, ctx: U) => any)

export interface StoreLike<T> extends Observable<T> {
    state: T
    select<R>(selector: Selector<T, R>): Observable<R>
    dispatch(action: any): void
    setState(setter: StateSetter<T>): void
}

export type InitialState<T> = { [key in keyof T]: T[key] | Selector<T, T[key]> }

export type Computed<T> = { [key in keyof T]: Selector<T, any> }

export type InitialStateGetter<T> = () => InitialState<T>
