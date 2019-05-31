import { TeardownLogic, Observable } from "rxjs"

/**
 * Typed version of `SimpleChange`
 */
export interface TypedChange<T> {
    previousValue: T
    currentValue: T
    firstChange: boolean
    isFirstChange(): boolean
}

/**
 * Typed version of `SimpleChanges`
 */
export type TypedChanges<T> = { [key in keyof T]?: TypedChange<T[key]> }

/**
 * Objects that can be passed {@link Stream#sink sink} or {@link Stream#add add}
 */
export type Sinkable = TeardownLogic | Observable<TeardownLogic>
