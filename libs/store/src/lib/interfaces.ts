import { NextObserver, Observable } from "rxjs"

export type Feature = string

export type PartialValueFnWithContext<T, U extends any = any> = (
    state: T,
    ctx: U,
) => Partial<T> | void
export type PartialValueFn<T> = (state: T) => Partial<T> | void
export type PartialValue<T> = Partial<T>

export type _DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
export interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
export type DeepReadonly<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
    ? _DeepReadonlyArray<T[number]>
    : T extends object
    ? _DeepReadonlyObject<T>
    : T

export type Action<T extends { type: string; payload?: any } = { type: string }> = {
    readonly type: ActionType<T>
    readonly payload?: ActionPayload<T>
}

export type ActionType<T extends Action> = T["type"]
export type ActionPayload<T extends Action> = T["payload"]

export type ActionFactory<T extends string = string, U = any> = Action & ((
    payload: U,
) => Action<{ type: T; payload: DeepReadonly<U> }>)

export type StoreSnapshotChanges<T> = {
    [key in keyof T]?: {
        hasChanged: boolean
        previousValue: T[key]
        currentValue: T[key]
    }
}

export interface StoreSnapshot<T extends object> {
    value: T
    previousValue: T
    changes: StoreSnapshotChanges<T>
}

export type Selector<S, R> = (state: S) => R

export interface StoreLike<T> extends Observable<T>, NextObserver<T> {
    next<U extends any>(partial: PartialValueFnWithContext<T, U>, context: U): void
    next(partial: PartialValueFn<T>): void
    next(partial: PartialValue<T>): void
}
