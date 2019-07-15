import { Inject, Injectable } from "@angular/core"
import { BehaviorSubject, NextObserver, Observable } from "rxjs"
import { Feature, PartialValue, PartialValueFn, PartialValueFnWithContext } from "./interfaces"
import { FEATURE, INITIAL_STATE } from "./constants"
import { toEnumeratedValue } from "./utils"
import produce from "immer"

let resolve: Promise<void>

@Injectable()
export class Store<T extends object> extends Observable<T>
    implements NextObserver<PartialValue<T>> {
    private readonly feature: Feature
    private readonly state: BehaviorSubject<T>
    private buffer: Set<any>

    constructor(@Inject(INITIAL_STATE) initialState: any, @Inject(FEATURE) feature: Feature) {
        super(subscriber => this.state.subscribe(subscriber))
        initialState = Object.setPrototypeOf(initialState, null)
        this.state = new BehaviorSubject(initialState)
        this.feature = feature
        this.buffer = new Set()
    }

    public next<U extends any>(partial: PartialValueFnWithContext<T, U>, context: U)
    public next(partial: PartialValueFn<T>)
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
                    Object.assign(draft, partial instanceof Function ? partial(draft, context) : partial)
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
