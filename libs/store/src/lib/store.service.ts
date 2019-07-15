import { Inject, Injectable } from "@angular/core"
import { BehaviorSubject, NextObserver, Observable } from "rxjs"
import { Feature, PartialValue, PartialValueFn, PartialValueFnWithContext } from "./interfaces"
import { FEATURE, INITIAL_STATE } from "./constants"
import { toEnumeratedValue } from "./utils"
import produce from "immer"

let resolve: Promise<void>

/**
 * Store, retrieve and share application state across components, directives and services.
 *
 * @usageNotes
 *
 * ### Subscribing to, selecting and setting state.
 *
 * ```ts
 * @Component({
 *     selector: "app-root",
 *     template: `
 *         <button (click)="selectTodo()">Click</button>
 *     `,
 * })
 * export class AppComponent {
 *     constructor(public store: Store<AppState>) {
 *         store
 *             .pipe(
 *                 // select state from store
 *                 select(state => state.todos[state.todoSelected]),
 *             )
 *             .subscribe(selectedTodo => {
 *                 // do something with the value when it changes
 *                 console.log(selectedTodo)
 *             })
 *     }
 *
 *     public selectTodo() {
 *         // Patch state with object
 *         this.store.next({
 *             todoSelected: 1,
 *         })
 *
 *         // OR; Mutate state in producer function
 *         this.store.next(state => {
 *             state.todoSelected = 1
 *         })
 *
 *         // OR; Patch state with object returned from producer function
 *         this.store.next(state => ({
 *             todoSelected: 1,
 *         }))
 *     }
 * }
 * ```
 *
 * @publicApi
 */
@Injectable()
export class Store<T extends object> extends Observable<T>
    implements NextObserver<PartialValue<T>> {
    private readonly feature: Feature
    private readonly state: BehaviorSubject<T>
    private buffer: Set<any>

    /**
     * Creates a new `Store` instance
     *
     * @param initialState The state object that the store should be initialised with
     * @param feature The unique name of the store
     */
    constructor(@Inject(INITIAL_STATE) initialState: any, @Inject(FEATURE) feature: Feature) {
        super(subscriber => this.state.subscribe(subscriber))
        initialState = Object.setPrototypeOf(initialState, null)
        this.state = new BehaviorSubject(initialState)
        this.feature = feature
        this.buffer = new Set()
    }

    /**
     * Set the next state of the store. Each call is buffered until the the current microtask queue is
     * flushed.
     *
     * @param partial A producer function with an additional context argument. This is used internally by the
     *        {@link setState} operator to pass in the value emitted by the previous observable.
     * @param context
     */
    public next<U extends any>(partial: PartialValueFnWithContext<T, U>, context: U)
    /**
     * Set the next state of the store. Each call is buffered until the the current microtask queue is
     * flushed.
     *
     * @param partial A producer function that accepts a copy of the current state as its first argument which can either
     * be mutated in place, otherwise returning a new object that will be shallowly merged with the current state.
     */
    public next(partial: PartialValueFn<T>)
    /**
     * Set the next state of the store. Each call is buffered until the the current microtask queue is
     * flushed.
     *
     * @param partial An object that will be shallowly merged with the current state.
     */
    public next(partial: PartialValue<T>)
    public next(partial: object) {
        const currentValue = this.state.getValue()

        if (partial && partial !== currentValue) {
            this.buffer.add([partial, arguments[1]])
        }

        if (!resolve) {
            const snapshot = toEnumeratedValue(currentValue)
            const producer = produce(draft => {
                this.buffer.forEach(([partial, context]) => {
                    Object.assign(
                        draft,
                        partial instanceof Function ? partial(draft, context) : partial,
                    )
                })
            })
            resolve = Promise.resolve()
            resolve.then(() => {
                const nextValue = producer(snapshot)

                this.buffer.clear()
                resolve = undefined

                this.state.next(nextValue)
            })
        }
    }
}
