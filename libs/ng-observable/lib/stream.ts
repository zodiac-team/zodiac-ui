import { Injectable, OnDestroy } from "@angular/core"
import { Subscription, NextObserver, ObservableInput, from } from "rxjs"
import { Callable } from "./internals/callable"
import { Sinkable } from "./interfaces"
import { isTeardownLogic } from "./internals/type-guards"

function createStream(sub: Subscription) {
    return function stream(...targets: (NextObserver<any> | ((value: any) => void))[]) {
        return function(...sources: ObservableInput<any>[]) {
            for (const source of sources) {
                sub.add(
                    from(source).subscribe(value => {
                        for (const target of targets) {
                            if (typeof target === "function") {
                                target(value)
                            } else {
                                target.next(value)
                            }
                        }
                    }),
                )
            }
        }
    }
}

export type StreamFn = <T>(
    ...targets: (NextObserver<T> | ((value: any) => void))[]
) => (...sources: ObservableInput<T>[]) => void

export interface Stream extends StreamFn {
    <T>(...targets: (NextObserver<T> | ((value: any) => void))[]): (
        ...sources: ObservableInput<T>[]
    ) => void
}

/**
* Automatically subscribes to source observables and forwards their values to target observers while
    * discarding error and completion events. Cleans up all subscriptions when the stream completes by manually calling `complete`
* or when the bound injector is destroyed.
*
* @usageNotes
*
* Basic usage
*
* ```ts
 * const stream = new Stream()
 * const dest = new Subject()
 * const source = interval(1000)
 *
 * stream(dest)(source)
 *
 * stream.sink = source
 * stream.add(source)
 *
 * // unsubscribe from all sources
 * stream.complete()
 * ```
*
* With `State`
*
* ```typescript
 *
 * @Component({
 *     viewProviders: [StateFactory] // or providers
 * })
 * export class MyComponent {
 *     count: number
 *
 *     constructor(stateFactory: StateFactory) {
 *         const state = stateFactory.create(this)
 *
 *         // update count once per second
 *         // automatically unsubscribe when component is destroyed
 *         stream(state)(interval(1000).pipe(
 *             map(count => ({ count }))
 *         ))
 *     }
 * }
 * ```
*
* @publicApi
*/
@Injectable()
export class Stream extends Callable<StreamFn> implements OnDestroy {
    private sub: Subscription

    /**
     * A subscription or an observable of teardown logic that will be cleaned up
     * when the stream ends.
     */
    public set sink(sinkable: Sinkable | Sinkable[]) {
        if (!sinkable) {
            return
        }
        if (isTeardownLogic(sinkable)) {
            this.sub.add(sinkable)
        } else if (Array.isArray(sinkable)) {
            for (const stream of sinkable) {
                this.sink = stream
            }
        } else {
            this.sink = from(sinkable).subscribe(stream => {
                this.sink = stream
            })
        }
    }

    constructor() {
        const sub = new Subscription()
        super(createStream(sub))
        this.sub = sub
    }

    /**
     * Alternative to {@link sink}
     *
     * @param sinkables A series of {@link Sinkable} to be cleaned up when the stream ends.
     */
    public add(...sinkables: Sinkable[]) {
        this.sink = sinkables
    }

    /**
     * Completes the stream and unsubscribes from all sources.
     */
    public complete() {
        this.sub.unsubscribe()
    }

    /**
     * `OnDestroy` hook called by Angular when the bound injector is destroyed
     */
    public ngOnDestroy() {
        this.complete()
    }
}
