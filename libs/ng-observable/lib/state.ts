import { ChangeDetectorRef, Inject, Injectable, isDevMode, OnDestroy, Optional } from "@angular/core"
import { BehaviorSubject, asapScheduler } from "rxjs"
import { Stream } from "./stream"
import { STATE_CHANGE_STRATEGY, StateChangeStrategy } from "./constants"
import { debounceTime } from "rxjs/operators"

export class State<T extends object> extends BehaviorSubject<T> {
    public readonly next: (partialState?: Partial<T>) => void
    public readonly patchValue: (partialState?: Partial<T>) => void
    private readonly valueRef: T

    constructor(valueRef: T) {
        super(Object.create(valueRef))

        this.valueRef = valueRef

        this.next = (partialState?: Partial<T>) => {
            this.patchValue(partialState)
            super.next(Object.create(valueRef))
        }

        this.patchValue = (partialState?: Partial<T>) => {
            Object.assign(valueRef, partialState)
        }
    }
}

@Injectable()
export class StateFactory<T extends Object> implements OnDestroy {
    private readonly stream: Stream
    private readonly strategy: StateChangeStrategy
    private readonly cdr?: ChangeDetectorRef
    constructor(
        @Inject(STATE_CHANGE_STRATEGY) strategy: StateChangeStrategy,
        @Optional() cdr?: ChangeDetectorRef,
    ) {
        this.stream = new Stream()
        this.cdr = cdr
        this.strategy = strategy
    }

    public create(valueRef: T): State<T> {
        const { cdr, strategy } = this
        const state = new State(valueRef)
        const shouldDetach = strategy === StateChangeStrategy.DETACH

        if (cdr) {
            if (!shouldDetach) {
                cdr.reattach()
            }
            Promise.resolve().then(() => {
                if (shouldDetach) {
                    cdr.detach()
                }

                this.stream({
                    next: () => {
                        cdr.detectChanges()
                        if (isDevMode()) {
                            cdr.checkNoChanges()
                        }
                    }
                })(debounceTime(0, asapScheduler)(state))
            })
        }

        return state
    }

    public ngOnDestroy() {
        this.stream.complete()
    }
}
