import { combineLatest, OperatorFunction } from "rxjs"
import { filter, map, scan, switchMap } from "rxjs/operators"
import { Feature } from "../../interfaces"
import { Store } from "../../store.service"
import { StoreAction, StoreMap } from "./interfaces"

export function createGlobalState(): OperatorFunction<StoreMap, any> {
    return function(source) {
        return source.pipe(
            filter(Boolean),
            switchMap(storeMap =>
                combineLatest(
                    Array.from(storeMap.entries()).map(([feature, store]) =>
                        store.pipe(map(state => ({ feature, state }))),
                    ),
                ).pipe(
                    map(values => {
                        return values.reduce(
                            (acc, { feature, state }) => {
                                acc[feature] = state
                                return acc
                            },
                            Object.create(null) as any,
                        )
                    }),
                ),
            ),
        )
    }
}

export function addOrRemoveStores(): OperatorFunction<StoreAction, StoreMap> {
    return function(source) {
        return source.pipe(
            filter((action) => action.type === "ADD" || action.type === "REMOVE"),
            scan((storeMap, action) => {
                if (action.type === "ADD") {
                    const { feature, store } = action.payload
                    if (storeMap.has(action.payload.feature)) {
                        throw new Error(`Feature store called "${feature}" already exists.`)
                    }

                    storeMap.set(feature, store)
                }

                if (action.type === "REMOVE") {
                    storeMap.delete(action.payload.feature)
                }

                return storeMap
            }, new Map<Feature, Store<any>>()),
        )
    }
}
