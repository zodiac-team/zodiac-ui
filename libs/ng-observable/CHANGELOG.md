# CHANGELOG

## v0.2.0

- Upgrade to Angular 8.0.0.

- Api docs moved inline with code. New docs website <<TBD>>

- Debouncing `State` change detection again to next microtask tick. State observers will still be notified immediately.

- `StreamSink` is now `Stream`. This should be provided to each component/directive that needs it. For example:

```ts
@Component({
    viewProviders: [Stream] // or providers
})
export class MyComponent {
    constructor(@Self() stream: Stream) { // use @Self() to guard against using the wrong provider
        // subscribes and automatically cleans up when destroyed
        stream((count) => console.log(count))(interval(1000))
    }
}
```

- Removed `stream` operator. Use `Stream` instead.

- `NgObservable` is no longer generic. Removed `sink` property simplified implementation. For `sink` behaviour use `Stream` instead.

- `NgObservable` no longer extends `Observable`. Lifecycle hooks and operators now check for the presence of named prototype/instance properties.

- `InvokeSubject` now accepts a function argument that is called instead of the default function.

- Removed `useDefaultLifecycleHooks` provider. Lifecycle flags no longer need to be configured. 

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
