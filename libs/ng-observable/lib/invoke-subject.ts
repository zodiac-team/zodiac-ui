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

    constructor(fn?: NextFn<T>) {
        super(fn ? fn : (...args: any) => {
            const len = args.length
            if (len === 0) {
                this.next()
            } else if (len === 1) {
                this.next(args[0])
            } else {
                this.next(args)
            }
        })
        Object.assign(this, new Subject())
    }
}
