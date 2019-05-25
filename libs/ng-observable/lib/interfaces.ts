import { NgHooksEventType } from "./constants"
import { Observable, TeardownLogic } from "rxjs"

export interface TypedChange<T> {
    previousValue: T
    currentValue: T
    firstChange: boolean
    isFirstChange(): boolean
}

export type TypedChanges<T> = { [key in keyof T]?: TypedChange<T[key]> }

export type NgHooksEvent<T extends any = any> =
    | [NgHooksEventType, TypedChanges<T>]
    | [NgHooksEventType]

export type Sinkable = TeardownLogic | Observable<TeardownLogic>
