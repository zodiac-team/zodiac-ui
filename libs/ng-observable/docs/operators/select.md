# `select<T, U>`

Derive state from upstream observable and emit when the derived state changes. Recommended for use with `State<T>`. Provided for convenience if other select methods aren't available.

> If you're using this to derive properties from a component or directive, consider using `@Computed<T>` properties

## Usage

```typescript
// this example uses createSelector from @ngrx/store

export interface MyState {
    title: string
}

export const $myState = (state: MyState) => state

// use selector factories to give each component instance its own memoized selector
export const $title = () =>
    createSelector(
        $myState,
        (state = state.title),
    )

@Component({
    viewProviders: [StateFactory],
})
export class MyComponent implements MyState {
    title: string
    constructor(stateFactory: StateFactory<MyState>) {
        this.title = ""
        this.state = stateFactory.create(this)

        this.state.pipe(select($title())).subscribe(title => console.log(title))

        // alternative form
        select(this.state, $title()).subscribe(title => console.log(title))
    }
}
```

## API

```typescript
select<T, U>(selector: (state: T) => U): OperatorFunction<T, U>
select<T, U>(state: Observable<T>, selector: (state: T) => U): Observable<U>
```
