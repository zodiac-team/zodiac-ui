import { StoreDevtoolsConfig } from "./interfaces"

export const devtools: any =
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ ||
    (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__

export const DEFAULT_NAME = "Store"

export const DEFAULT_OPTIONS = {
    maxAge: false,
    monitor: null,
    actionSanitizer: undefined,
    stateSanitizer: undefined,
    name: DEFAULT_NAME,
    serialize: false,
    logOnly: false,
    // Add all features explicitely. This prevent buggy behavior for
    // options like "lock" which might otherwise not show up.
    features: {
        pause: true, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects
        persist: true, // persist states on page reloading
        export: true, // export history of actions in a file
        import: "custom", // import history of actions from a file
        jump: true, // jump back and forth (time travelling)
        skip: true, // skip (cancel) actions
        reorder: true, // drag and drop actions in the history list
        dispatch: true, // dispatch custom actions or action creators
        test: true, // generate tests for the selected actions
        trace: true,
    },
}

export function createDevtoolsExtension(config: StoreDevtoolsConfig) {
    if (!devtools) {
        return null
    }
    return devtools.connect({
        ...DEFAULT_OPTIONS,
        ...config,
        features: {
            ...DEFAULT_OPTIONS.features,
            // ...(config.features || {})
        },
    })
}
