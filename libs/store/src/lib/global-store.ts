import { BehaviorSubject, NextObserver, Observable, Subject } from "rxjs"
import { Feature, PartialValue } from "./interfaces"
import { Store } from "./store.service"
import { StoreAction, StoreMap } from "./effects/internals/interfaces"
import { addOrRemoveStores, createGlobalState } from "./effects/internals/operators"
import { filter, withLatestFrom } from "rxjs/operators"

export class GlobalStore<T extends object = any> extends Observable<T>
    implements NextObserver<PartialValue<T>> {
    private readonly nextAction: Subject<StoreAction>
    private readonly stores: BehaviorSubject<StoreMap>
    private readonly globalState: BehaviorSubject<any>

    constructor() {
        super(subscriber => this.globalState.subscribe(subscriber))
        this.nextAction = new Subject()
        this.stores = new BehaviorSubject(null)
        this.globalState = new BehaviorSubject({})

        this.nextAction.pipe(addOrRemoveStores()).subscribe(this.stores)

        this.stores.pipe(createGlobalState()).subscribe(this.globalState)

        this.nextAction
            .pipe(
                filter(action => action.type === "NEXT"),
                withLatestFrom(this.stores.pipe(filter(Boolean))),
            )
            .subscribe(([action, stores]) => {
                stores.forEach((store, feature) => {
                    const nextValue = action.payload[feature]
                    if (nextValue) {
                        setTimeout(() => {
                            store.next(nextValue)
                        })
                    }
                })
            })
    }

    public addStore(feature: string, store: Store<any>) {
        this.nextAction.next({
            type: "ADD",
            payload: {
                feature,
                store,
            },
        })
    }

    public removeStore(feature: Feature) {
        this.nextAction.next({
            type: "REMOVE",
            payload: {
                feature,
            },
        })
    }

    public next(state) {
        this.nextAction.next({
            type: "NEXT",
            payload: state,
        })
    }
}
