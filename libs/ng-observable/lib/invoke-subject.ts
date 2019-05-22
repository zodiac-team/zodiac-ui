import { Observable, Subject } from "rxjs"
import { applyMixins, mixins } from "./internals/apply-mixins"
import { Callable } from "./internals/callable"

export type NextFn<T> = (next: T) => void
export interface InvokeSubject<T> extends Observable<T> {
    (): void
    (next: T): void
    unsubscribe(): void
    asObservable(): Observable<T>
}

export class InvokeSubject<T> extends Callable<NextFn<T>> {
    private static [mixins] = applyMixins(InvokeSubject, [Observable, Subject])

    constructor() {
        super((value: T) => {
            this.next(value)
        })
        Object.assign(this, new Subject())
    }

    private next!: NextFn<T>
}
