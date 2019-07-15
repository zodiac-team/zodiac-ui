import { FEATURE, INITIAL_STATE } from "./constants"
import { StaticProvider } from "@angular/core"
import { Store } from "./store.service"

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
