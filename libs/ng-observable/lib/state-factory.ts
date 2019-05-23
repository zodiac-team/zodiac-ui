import { ChangeDetectorRef, Injectable, OnDestroy, Optional } from "@angular/core"
import { BehaviorSubject, from, Observable, ObservableInput, PartialObserver, Subscription } from "rxjs"
import { diffEquals } from "./internals/diff-equals"
import { ngOnChanges } from "../operators/ng-on-changes"
import { NgHooksEvent } from "./interfaces"
import { map } from "rxjs/operators"
import { stream } from "../operators/stream"

export function mapPropsToState<T extends any = any>(source: Observable<NgHooksEvent<T>>) {
    return ngOnChanges(source).pipe(
        map((changes) =>
            Object.entries(changes).reduce((partialState, [key, value]) => {
                partialState[key] = value.currentValue
                return partialState
            }, {} as T)
        )
    )
}

export class State<T> extends BehaviorSubject<T> implements OnDestroy {
    public readonly value: T
    private readonly cdr?: ChangeDetectorRef
    private readonly notifier?: Subscription

    constructor(value: T, notifier?: ObservableInput<Partial<T> | void>, cdr?: ChangeDetectorRef) {
        super(value)

        this.cdr = cdr

        if (notifier) {
            this.notifier = from(notifier).subscribe((partialState: Partial<T>) => {
                this.patchState(partialState)
            })
        }
    }

    public next(partialState?: Partial<T>) {
        if (this.cdr) {
            this.cdr.markForCheck()
        }
        this.patchState(partialState)
    }

    public unsubscribe() {
        this.notifier.unsubscribe()
        super.unsubscribe()
    }

    public ngOnDestroy() {
        this.complete()
        this.unsubscribe()
    }

    private patchState(partialState: Partial<T> = {}) {
        Object.assign(this.value, partialState)
        super.next(this.value)
    }
}

@Injectable()
export class StateFactory<T> {
    constructor(@Optional() private readonly cdr: ChangeDetectorRef) {}
    public create(value: T, notifier?: ObservableInput<Partial<T> | void>): State<T> {
        return new State(value, notifier, this.cdr)
    }
}
