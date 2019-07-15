import { Inject, ModuleWithProviders, NgModule, OnDestroy } from "@angular/core"
import { provideStore } from "./providers"
import { Store } from "./store.service"
import { Feature } from "./interfaces"
import { FEATURE } from "./constants"
import { GlobalStore } from "./global-store"
import { Actions } from "./actions"

/**
 * Implements all of the builtin lifecycle hooks provided by Angular and makes them observable.
 *
 * @usageNotes
 *
 * ```ts
 * @Component()
 * export class MyComponent extends NgObservable {
 *     constructor() {
 *         ngOnInit(this).subscribe(() => {
 *             console.log("ngOnInit")
 *         })
 *     }
 * }
 * ```
 *
 * @publicApi
 */
@NgModule({})
export class StoreModule implements OnDestroy {
    constructor(private globalStore: GlobalStore, @Inject(FEATURE) private feature: Feature, store: Store<any>) {
        globalStore.addStore(feature, store)
    }

    static forRoot<T>(initialState: T): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                provideStore("root", initialState),
                Actions,
                GlobalStore
            ],
        }
    }

    static forChild(feature: string, initialState: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [provideStore(feature, initialState)],
        }
    }

    public ngOnDestroy() {
        this.globalStore.removeStore(this.feature)
    }
}
