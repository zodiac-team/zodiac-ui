import { APP_INITIALIZER } from "@angular/core"
import { configureLifecycleHooks } from "./internals/configure-lifecycle-hooks"
import { LIFECYCLE_FLAGS, STATE_CHANGE_STRATEGY, StateChangeStrategy } from "./constants"

export function useDefaultLifecycleHooks(...flags: number[]) {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: configureLifecycleHooks,
            multi: true,
            deps: [LIFECYCLE_FLAGS],
        },
        {
            provide: LIFECYCLE_FLAGS,
            useValue: flags,
        },
    ]
}

export function useStateChangeStrategy(strategy: StateChangeStrategy) {
    return {
        provide: STATE_CHANGE_STRATEGY,
        useValue: strategy,
    }
}
