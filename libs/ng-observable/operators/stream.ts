import { Observable, of, PartialObserver, Unsubscribable } from "rxjs"

export function stream<T extends any = any>(
    observer?: PartialObserver<T>,
): (source: Observable<T>) => Observable<Unsubscribable>
export function stream<T extends any = any>(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void,
): (source: Observable<T>) => Observable<Unsubscribable>
export function stream<T extends any = any>(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void,
): (source: Observable<T>) => Observable<Unsubscribable> {
    const args = Array.from(arguments)

    return function(source) {
        return of(source.subscribe(...args))
    }
}
