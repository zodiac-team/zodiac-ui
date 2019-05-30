import { Injectable, OnDestroy } from "@angular/core"
import { Subscription, NextObserver, ObservableInput, from } from "rxjs"
import { Callable } from "./internals/callable"

function createStream(sub: Subscription) {
    return function stream(...targets: (NextObserver<any> | ((value: any) => void))[]) {
        return function (...sources: ObservableInput<any>[]) {
            for (const source of sources) {
                sub.add(from(source).subscribe((value) => {
                    for (const target of targets) {
                        if (typeof target === "function") {
                            target(value)
                        } else {
                            target.next(value)
                        }
                    }
                }))
            }
        }
    }
}

export type StreamFn =
    <T>(...targets: NextObserver<T>[]) => (...sources: ObservableInput<T>[]) => void

export interface Stream extends StreamFn {}

@Injectable()
export class Stream extends Callable<StreamFn> implements OnDestroy {
    public sub: Subscription

    constructor() {
        const sub = new Subscription()
        super(createStream(sub))
        this.sub = sub
    }

    public complete() {
        this.sub.unsubscribe()
    }

    public ngOnDestroy() {
        this.complete()
    }
}
