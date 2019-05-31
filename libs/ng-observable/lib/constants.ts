import { InjectionToken } from "@angular/core"

/**
 * The strategy that the state factory uses to detect changes.
 * When set, takes effect the next time change detection is triggered.
 *
 * @publicApi
 */
export enum StateChangeStrategy {
    /**
     * If detached, reattaches the `ChangeDetectorRef` and allows `OnPush` and `Default` change
     * detection strategies to trigger change detection. If using "noop" zones, this setting has
     * no effect.
     */
    REATTACH = 0,

    /**
     * When using this strategy, the `ChangeDetectorRef` is automatically detached after the first render.
     * All change detection must be performed manually by calling `detectChanges` on `ChangeDetectorRef`
     * or by using {@link StateFactory} and calling {@link State#next}.
     *
     */
    DETACH = 1,
}

/**
 * Provider token for {@link StateChangeStrategy}
 */
export const STATE_CHANGE_STRATEGY = new InjectionToken<StateChangeStrategy>(
    "STATE_CHANGE_STRATEGY",
)
