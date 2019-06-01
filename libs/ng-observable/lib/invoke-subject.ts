import { Observable, Subject } from "rxjs"
import { applyMixins, mixins } from "./internals/apply-mixins"
import { Callable } from "./internals/callable"

export type NextFn<T> = (next: T) => void

export interface InvokeSubject<T> extends Subject<T> {
    (next: T): void
    (...next: T extends Array<infer U> ? T : never[]): void
}

/**
 * A subject that implements both `Subject<T>` and `Function` interfaces. Using this subject in place of a normal
 * method turns all invocations of that method into an observable stream without needing to modify the source of
 * the caller. When called with multiple arguments it will emit the arguments as an array.
 *
 * @usageNotes
 *
 * Basic usage
 *
 * ```ts
 * const subject = new InvokeSubject<string>() // single argument
 * const subject2 = new InvokeSubject<[string, number]>() // multiple arguments
 *
 * subject("message")
 * subject2("message", 42)
 *
 * // with custom invoke function
 * const subject3 = new InvokeSubject<string>(function () {
 *     subject3.next("message") // call "next" to emit value
 * })
 * ```
 *
 * Convert `@HostListener` and `(event)` bindings into observable streams
 *
 * ```ts
 * @Component({
 *     template: `<input type="text" (input)="inputChanges($event)" />`
 * })
 * export class MyComponent implements OnDestroy {
 *     @HostListener("click", ["$event"])
 *     readonly hostClick = new InvokeSubject<MouseEvent>()
 *     readonly inputChanges = new InvokeSubject<Event>()
 *
 *     constructor() {
 *         hostClick.subscribe(event => console.log(event))
 *         inputChanges.subscribe(event => console.log(event))
 *     }
 * }
 * ```
 *
 * @publicApi
 */
export class InvokeSubject<T> extends Callable<NextFn<T>> {
    private static [mixins] = applyMixins(InvokeSubject, [Observable, Subject])

    /**
     * Creates a new `InvokeSubject` instance
     *
     * @param nextFn A function to be called when the subject is invoked
     *
     */
    constructor(nextFn?: NextFn<T>) {
        super(nextFn ? nextFn : (...args: any) => {
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
