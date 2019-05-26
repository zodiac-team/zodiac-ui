# `@Computed<T>`

Calculates computed properties with the provided function. Transforms the target property into a readonly getter. Use memoized functions for extra performance.

## Usage

```typescript
export interface MyState {
    firstName: string
    lastName: string
}

// this example is not memoized
export const $fullName = () => (state: MyState) => state.firstName + " " + state.lastName

@Component()
export class MyComponent implements MyState {
    @Computed<string>($fullName)
    readonly fullName: string
}
```

Use factory functions when creating memoized selectors so that each instance of the class gets its own cache. For example:

```typescript
// This example uses createSelector from @ngrx/store
const $myState = (state: MyState) => state
const $fullName = createSelector(
    $myState,
    state => state.firstName + " " + state.lastName,
)
// Don't do this!
const $selectFullName = () => $fullName
// Wrap call to createSelector inside factory
const $selectFullName = () =>
    createSelector(
        $myState,
        state => state.firstName + " " + state.lastName,
    )
```

## API

| Arguments                                  | Description                                         |
| :----------------------------------------- | :-------------------------------------------------- |
| `selectorFactory: () => (state: any) => T` | Selector factory that calculates the computed value |

Returns `PropertyDecorator`
