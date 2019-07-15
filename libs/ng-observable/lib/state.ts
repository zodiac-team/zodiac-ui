import { ChangeDetectorRef, Inject, Injectable, isDevMode, OnDestroy, Optional } from "@angular/core"
import { asapScheduler, BehaviorSubject } from "rxjs"
import { Stream } from "./stream"
import { STATE_CHANGE_STRATEGY, StateChangeStrategy } from "./constants"
import { debounceTime } from "rxjs/operators"
import { InvokeSubject } from "./invoke-subject"

/**
 * State object for bound `valueRef`. State changes mutate the original object in-place and notifies any observers
 * with a new object reference.
 *
 * @see {@link StateFactory}
 *
 * @usageNotes
 *
 * @publicApi
 */
export class State<T extends object> extends BehaviorSubject<T> {
    /**
     * Mutate the state, notify observers and queue change detection.
     *
     * @param partialState A plain object containing values to mutate the existing state with.
     */
    public readonly next: (partialState?: Partial<T>) => void

    /**
     *
     * Mutate the state and notify observers without running change detection.
     *
     * @param partialState A plain object containing values to mutate the existing state with.
     */
    public readonly patchValue: (partialState?: Partial<T>) => void

    /**
     * The value object reference to be mutated.
     */
    private readonly valueRef: T

    /**
     * Creates a new State `instance`.
     *
     * @param valueRef The mutable value object reference to apply state changes to.
     * @param markForCheck Notifier that schedules change detection to run on the next microtask.
     */
    constructor(valueRef: T, markForCheck: Function) {
        super(Object.create(valueRef))

        this.valueRef = valueRef

        this.next = (partialState?: Partial<T>) => {
            this.patchValue(partialState)
            markForCheck()
        }

        this.patchValue = (partialState?: Partial<T>) => {
            Object.assign(valueRef, partialState)
            super.next(Object.create(valueRef))
        }
    }
}

/**
 * Reactive state management for Angular components and directives.
 *
 * @see {@link State}
 *
 * @usageNotes
 *
 * Create a `State<T>` instance by passing the component instance as an argument. All mutations to
 * the internal component state should be handled with this service so that observers can be notified
 * of changes.
 *
 * ```typescript
 * export interface MyProps {
 *     title: string
 * }
 *
 * export interface MyState extends MyProps {
 *     model: string
 * }
 *
 * @Component({
 *     viewProviders: [StateFactory, Stream] // or providers
 * })
 * export class MyComponent implements MyState {
 *     @Input()
 *     title: string
 *     model: string
 *
 *     constructor(@Self() stateFactory: StateFactory<MyState>, @Self() stream: Stream) {
 *         const state = stateFactory.create(this)
 *
 *         // Imperative usage
 *         state.next({
 *             model: "app"
 *         })
 *
 *         // Reactive usage
 *         stream(state)(of({ model: "app" }))
 *     }
 * }
 * ```
 *
 * ### Connecting `@Input()` properties
 *
 * Changes received from `@Input()` properties can be mapped onto the state to keep state observers up to date:
 *
 * ```ts
 * @Component()
 * export class MyComponent extends NgObservable implements MyState {
 *     @Input()
 *     value: any
 *     mappedValue: any
 *
 *     constructor(@Self() stateFactory: StateFactory<MyState>, @Self() stream: Stream) {
 *         const state = stateFactory.create(this)
 *
 *         // assuming 1:1 map between inputs and state
 *         stream(state)(mapInputsToState(this))
 *
 *         // map inputs to some other value
 *         stream(state)(mapInputsToState(this).pipe(
 *             map((props) => ({
 *                 mappedValue: props.value
 *             }))
 *         )
 *     }
 * }
 * ```
 *
 * @publicApi
 */
@Injectable()
export class StateFactory<T extends Object> implements OnDestroy {
    private readonly stream: Stream
    private readonly strategy: StateChangeStrategy
    private readonly cdr?: ChangeDetectorRef
    private readonly checkNoChanges: boolean

    /**
     * Creates an instance of `StateFactory`
     *
     * @param strategy The {@link StateChangeStrategy} to be used. It will wither detach or reattach
     * the `ChangeDetectorRef` if one is provided.
     *
     * @param cdr The `ChangeDetectorRef` for the current view.
     *
     */
    constructor(
        @Inject(STATE_CHANGE_STRATEGY) strategy: StateChangeStrategy,
        @Optional() cdr?: ChangeDetectorRef,
    ) {
        this.stream = new Stream()
        this.cdr = cdr
        this.strategy = strategy
        this.checkNoChanges = isDevMode()
    }

    /**
     * Creates an instance of {@link State} bound to the given `valueRef`. Performs change detection when notified
     * by `markForCheck`.
     *
     * @param valueRef The mutable value object reference to apply state changes to.
     */
    public create(valueRef: T): State<T> {
        const { cdr, strategy, stream, checkNoChanges } = this
        const markForCheck = new InvokeSubject<any>()
        const state = new State(valueRef, markForCheck)
        const shouldDetach = strategy === StateChangeStrategy.DETACH

        if (cdr) {
            const detectChanges = () => {
                cdr.detectChanges()
                if (checkNoChanges) {
                    cdr.checkNoChanges()
                }
            }
            if (shouldDetach) {
                cdr.detach()
            }
            else {
                cdr.reattach()
            }
            Promise.resolve().then(() => {
                if (shouldDetach) {
                    detectChanges()
                }
                stream(detectChanges)(debounceTime(0, asapScheduler)(markForCheck))
            })
        }

        return state
    }

    /**
     * Cleanup when the injector is destroyed
     */
    public ngOnDestroy() {
        this.stream.complete()
    }
}
