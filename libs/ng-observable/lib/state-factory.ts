import { ChangeDetectorRef, Injectable, OnDestroy, Optional } from "@angular/core"
import { BehaviorSubject, from, Observable, ObservableInput, Subscription, ObjectUnsubscribedError } from "rxjs"
import { ngOnChanges } from "../operators/ng-on-changes"
import { NgHooksEvent } from "./interfaces"
import { map } from "rxjs/operators"

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

export class State<T extends Object> extends BehaviorSubject<T> implements OnDestroy {
    private readonly valueRef: T
    private readonly cdr?: ChangeDetectorRef
    private readonly notifier?: Subscription

    constructor(value: T, notifier?: ObservableInput<Partial<T> | undefined>, cdr?: ChangeDetectorRef) {
        super(Object.create(value))

        this.cdr = cdr
        this.valueRef = value

        if (notifier) {
            this.notifier = from(notifier).subscribe((partialState) => {
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
        if (this.notifier) {
            this.notifier.unsubscribe()
        }
        super.complete()
        super.unsubscribe()
    }

    public ngOnDestroy() {
        this.complete()
        this.unsubscribe()
    }

    private patchState(partialState: Partial<T> | undefined) {
        if (this.valueRef.isPrototypeOf(partialState as any)) {
            return
        }
        Object.assign(this.valueRef, partialState)
        super.next(Object.create(this.valueRef))
    }
}

@Injectable()
export class StateFactory<T extends Object> {
    constructor(@Optional() private readonly cdr: ChangeDetectorRef) {}
    public create(value: T, notifier?: ObservableInput<Partial<T> | undefined>): State<T> {
        return new State(value, notifier, this.cdr)
    }
}
