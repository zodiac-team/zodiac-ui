import { FEATURE, INITIAL_STATE } from "./constants"
import { StaticProvider } from "@angular/core"
import { Store } from "./store.service"

/**
 * Creates a store provider
 *
 * @param feature The unique name of the store being provided
 * @param initialState A state object that the store should be initialised with
 */
export function provideStore<T>(feature: string, initialState: T): StaticProvider {
    return [{
        provide: INITIAL_STATE,
        useValue: initialState,
    }, {
        provide: FEATURE,
        useValue: feature
    }, {
        provide: Store,
        useClass: Store
    }]
}
