import { NgObservable } from "../ng-observable"
import { createMask } from "./create-mask"

export function configureLifecycleHooks(...flags: number[]) {
    return function() {
        NgObservable.DEFAULT_LIFECYCLE_HOOKS = createMask(...flags)
        return Promise.resolve()
    }
}
