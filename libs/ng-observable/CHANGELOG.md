# CHANGELOG

## v0.1.4

-   Fix change detection when using `REATTACH` change strategy.

## v0.1.3

-   Only `checkNoChanges` in dev mode.

## v0.1.2

-   Fix bug with change detection on recursive component trees.

-   Change detection is no longer debounced and now executes immediately when calling `next()`

## v0.1.0

-   Detach views from `ChangeDetectorRef` after first render.
    Change detection is now queued on the calling directive or component
    whenever `State#next()` is called.

-   Add `patchValue` to `State` class. This allows state to be updated without
    triggering change detection.

-   Zone.js is now redundant. Add `ngZone: "noop"` to platform
    bootstrap and comment out the line `import "zone.js/dist/zone"`
    in `polyfills.ts` for a free performance boost. Note: Libraries
    that depend on zones such as `@angular/material` will still need
    the zones to work properly.

Without zones Angular no longer triggers change detection on events.
Additionally, running change detection on a parent component no
longer triggers change detection on its children. Each component must
manually call `State#next` or `ChangeDetectorRef#detectChanges` to
re-render the template. This behaviour ignores any setting of
`ChangeDetectionStrategy` at the compiler or component level, which
can be omitted. Instead, configure the root component with a default
`StateChangeStrategy`:

```typescript
@Component({
    providers: [
        useStateChangeStrategy(
            StateChangeStrategy.DETACH, // or REATTACH
        ),
    ],
})
export class AppComponent {}
```

This can be configured per component. The recommended default is to
use `DETACH`, and required if using `"noop"` zones.

-   Rename `mapPropsToState` to `mapInputsToState`. Add optional
    second argument for map function.

-   Bump supported Angular version.

-   Make library compatible with Ivy thrill seeker mode.

-   Improvements to `StateFactory`

-   `TypedChanges` now correctly marks all inputs as nullable.
