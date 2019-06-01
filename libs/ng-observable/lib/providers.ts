import { STATE_CHANGE_STRATEGY, StateChangeStrategy } from "./constants"

/**
 * Configures the change detection strategy for the current injector when used with {@link StateFactory}
 *
 * When using `DETACH` mode the change detector is detached after the first
 * change detection run and each component must manually call `State#next`
 * or `ChangeDetectorRef#detectChanges` afterwards to
 * re-render the template. This behaviour ignores any setting of
 * `ChangeDetectionStrategy` at the compiler or component level. `REATTACH`
 * will reattach the `ChangeDetectorRef` when the `State` is instantiated.
 *
 * @see {@link StateChangeStrategy.DETACH}
 * @see {@link StateChangeStrategy.REATTACH}
 *
 * @usageNotes
 *
 * ```typescript
 * @Component({
 *     providers: [
 *         useStateChangeStrategy(
 *             StateChangeStrategy.DETACH, // or REATTACH
 *         ),
 *     ],
 * })
 * export class AppComponent {}
 * ```
 *
 * @publicApi
 *
 * @param strategy A flag to determine the change detection strategy that should be used.
 *
 */
export function useStateChangeStrategy(strategy: StateChangeStrategy) {
    return {
        provide: STATE_CHANGE_STRATEGY,
        useValue: strategy,
    }
}
