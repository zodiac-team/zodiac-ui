import { NextObserver, Observable, of, Unsubscribable } from "rxjs"

export function stream<T extends any = any>(
    observer?: NextObserver<T>,
): (source: Observable<T>) => Observable<Unsubscribable>
export function stream<T extends any = any>(
    next?: (value: T) => void,
): (source: Observable<T>) => Observable<Unsubscribable>
export function stream<T extends any = any>(
    observerOrNext?: NextObserver<T> | ((value: T) => void),
): (source: Observable<T>) => Observable<Unsubscribable>
export function stream<T>(
    observerOrNext: any,
): (source: Observable<T>) => Observable<Unsubscribable> {
    return function(source) {
        return of(
            source.subscribe({
                next: (value: T) => {
                    observerOrNext.next ? observerOrNext.next(value) : observerOrNext(value)
                },
                error: error => {
                    console.error(error)
                },
            }),
        )
    }
}
