# `useStateChangeStrategy`

When using `DETACH` mode the change detector is detached after the first
change detection run and each component must manually call `State#next`
or `ChangeDetectorRef#detectChanges` afterwards to
re-render the template. This behaviour ignores any setting of
`ChangeDetectionStrategy` at the compiler or component level. `REATTACH`
will reattach the `ChangeDetectorRef` when the `State` is instantiated.

## Usage

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
