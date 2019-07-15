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
    /**
     * Creates a new `StoreModule` instance and registers the {@link Store} with the {@link GlobalStore} service.
     *
     * @param globalStore The global store that contains references to all other stores registered in the app.
     * @param feature The unique name of the provided store.
     * @param store The {@link Store} that was provided to this module.
     */
    constructor(private globalStore: GlobalStore, @Inject(FEATURE) private feature: Feature, store: Store<any>) {
        globalStore.addStore(feature, store)
    }

    /**
     * Registers global store providers and the root store for the application.
     *
     * @param initialState A state object that the root store should be initialised with.
     */
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

    /**
     * Registers the feature store for the dynamically loaded module it is provided to.
     *
     * @param feature The unique name for the store to be registered under.
     * @param initialState A state object that the feature store should be initialised with.
     */
    static forChild(feature: string, initialState: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [provideStore(feature, initialState)],
        }
    }

    /**
     * Removes the store from the {@link GlobalStore} service.
     */
    public ngOnDestroy() {
        this.globalStore.removeStore(this.feature)
    }
}
