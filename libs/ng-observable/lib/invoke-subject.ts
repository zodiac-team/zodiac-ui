import { Observable, Subject } from "rxjs"
import { applyMixins, mixins } from "./internals/apply-mixins"
import { Callable } from "./internals/callable"

export type NextFn<T> = (next: T) => void
export interface InvokeSubject<T> extends Subject<T> {
    (next: T): void
    (...next: T extends Array<infer U> ? T : never[]): void
}

export class InvokeSubject<T> extends Callable<NextFn<T>> {
    private static [mixins] = applyMixins(InvokeSubject, [Observable, Subject])

    constructor() {
        super((value: T) => {
            this.next(value)
        })
        Object.assign(this, new Subject())
    }
}
