# `useDefaultLifecycleHooks`

Provides the default lifecycle flags to be used by `NgObservable<T>`. Lifecycle events will only be emitted for the flags that are provided by this token unless overwritten at the component or directive level.

## Usage

```typescript
// Only provide this token once in the root injector.
@NgModule({
    providers: [
        // provide flags
        useDefaultLifecycleHooks(ON_INIT, ON_CHANGES, DO_CHECK, ON_DESTROY),
    ],
})
export class MyAppModule {}
```
