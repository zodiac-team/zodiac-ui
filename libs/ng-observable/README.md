# NgObservable

Create powerful reactive components with Angular. AoT compatible and Ivy ready.

-   🚀 Observe lifecycle hooks such as `ngOnInit`, `ngOnChanges`
-   🎉 Convert `HostListener` and template events into observable streams
-   ✈️ Manage and observe state changes in your components and directives
-   ☑️ Unlock [blazing performance](https://stackblitz.com/edit/angular-25scyj) with zoneless, observable change detection
-   💥 Use `@Decorators` for all of the builtin lifecycle hooks
-   🍷 Make computed properties with the `@Computed` decorator
-   🚫 Escape async hell and redundant placeholder variables
-   🚮 Automatically clean up subscriptions with `StreamSink`
-   🎈 Get strongly typed changes with `TypedChanges<T>`
-   👉 Extract implementation details into testable, composable, pure functions

## API

[Read the docs](https://zodiac-team.gitbook.io/zodiac-ui/libs/ng-observable/docs)

[Read the intro](https://dev.to/michaelmuscat/create-observable-angular-components-with-ngobservable-2424)

[See an example](https://zodiac-team.gitbook.io/zodiac-ui/libs/ng-observable/example)

[Try it on StackBlitz](https://stackblitz.com/edit/angular-25scyj)

## Setup

```
npm install @zodiac-ui/ng-observable
```

### Configure `DefaultLifecycleHooks` (optional)

`NgObservable` emits events for the following default lifecycle hooks:

-   `OnInit`
-   `OnChanges`
-   `OnContentInit`
-   `OnViewInit`
-   `OnDestroy`

This can be configured globally.

```typescript
// Only provide this token once in the root injector.
@NgModule({
    providers: [
        // provide default flags
        useDefaultLifecycleHooks(ON_INIT, ON_CHANGES, DO_CHECK, AFTER_VIEW_CHECKED, ON_DESTROY),
    ],
})
export class MyAppModule {}
```

For component level configuration, refer to the docs.

### Configure `State` (optional)

To get started with `State`, some additional configuration is needed.

The `State` utility provides its own change detection strategy that does not depend on zones. How this differs from
normal change detection is illustrated below.

|            | Zones  | `Microtask` | `Macrotask` | `(event)` | `@Input()` | `next()` |
| ---------- | ------ | ----------- | ----------- | --------- | ---------- | -------- |
| `Default`  | Yes    | ✅          | ✅          | ✅        | ✅         |          |
| `OnPush`   | Yes    |             |             | ✅        | ✅         |          |
| `OnPush`   | No     |             |             |           | ✅         |          |
| `REATTACH` | Yes    |             |             | ✅        | ✅         | ✅       |
| `REATTACH` | No     |             |             |           | ✅         | ✅       |
| `DETACH`   | N/A    |             |             |           |            | ✅       |

#### Set a default `StateChangeStrategy`

Add a default `StateChangeStrategy` to your root component.

```typescript
@Component({
    providers: [useStateChangeStrategy(StateChangeStrategy.DETACH)], // Or REATTACH if using zones
})
export class AppComponent {}
```

#### Remove `zone.js`

> If any parts of your project or dependencies (such as `@angular/material`) rely on `zone.js` for change detection,
> skip this step.

1. Remove the `zone.js` polyfill

```typescript
// polyfills.ts

import "zone.js/dist/zone" // <-- Remove this line
```

2. Configure `platformBrowserDynamic` to use `"noop"` zones:

> If using `Render3` from ivy beta, skip this step.

```typescript
// `main.ts`

platformBrowserDynamic()
    .bootstrapModule(AppModule, {
        ngZone: "noop", // <-- Add this line
    })
    .catch(err => console.error(err))
```
