import { APP_INITIALIZER } from "@angular/core"
import { configureLifecycleHooks } from "./internals/configure-lifecycle-hooks"
import { LIFECYCLE_FLAGS } from "./constants"

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
