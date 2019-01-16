# @zodiac-ui/store

An immutable store implementation for Angular based on ngrx.

## Getting Started

Install from NPM

```
npm install @zodiac-ui/store immer reselect
yarn add @zodiac-ui/store immer reselect
```

## Early adopters

Zodiac Store is in very early development. Please do not use this in production.

## Why use Zodiac Store?

Zodiac Store is a zero boilerplate immutable state store implementation based on `@ngrx/store`. Instead of
writing cumbersome actions and reducers, all state modifications are performed with a `setState` function.
Zodiac Store also offers a more powerful effects module that lets you take full advantage of reactive streams,
allowing you to read and set state at any time.

## Usage

Import the store module into your app.

```ts
@NgModule({
    imports: [StoreModule.forRoot(initialState)],
})
export class AppModule {}
```

### Initial State

Create an interface

```ts
export interface AppState {
    count: number
    todos: any
    computedValue: number
}
```

Define the initial state

```ts
export const initialState: AppState = {
    count: 0,
    todos: null,
    computedValue: null
}
```

### Set State

In a service or component

```ts
export class ExampleComponent {
    constructor(public store: Store<AppState>) {}

    increment() {
        this.store.setState(state => {
            state.count += 1
        })
    }
}
```

### Read State

From a template

```ts
@Component({
    selector: "z-example",
    template: `
        <ng-container *zStore="let state; in: store"> {{ state | json }} </ng-container>
    `,
})
export class ExampleComponent {
    constructor(public store: Store<AppState>) {}
}
```

From TypeScript

```ts
export class ExampleComponent {
    constructor(public store: Store<AppState>) {
        // Observable
        store.pipe(
            select((state) => state.count)
        ).subscribe(count => console.log(count))
        
        // Snapshot
        const count = store.state.count
    }
}
```

### Actions

Create an action. Actions are only used to trigger effects.

```ts
@OfType("GET_TODOS")
export class GetTodos {
    constructor(public payload: string) {}
}
```

Dispatch an action

```ts
export class StoreExample {
    constructor(private store: Store<AppState>) {}

    getTodos() {
        this.store.dispatch(new GetTodos("http://..."))
    }
}
```

### Effects

Import the effects module

```ts
@NgModule({
    imports: [EffectsModule.forRoot([AppEffects])],
})
export class AppModule {}
```

Create an effects class with injected dependencies

```ts
@Injectable()
export class AppEffects {
    static connect = createConnector<AppState, AppEffects>()
    constructor(public http: HttpClient) {}
}
```

Write some effects

```ts
AppEffects.connect((store, ctx) => {
    // Return an Observable
})
```

React to actions

```ts
AppEffects.connect((store, ctx) => (
    store.ofAction(GetTodos).pipe(
        switchMap((action) => ctx.http.get(action.payload)),
        tap((todos) => store.setState({ todos })
    )
))

```

## Selectors

Create a feature selector

```ts
const $feature = createFeatureSelector<AppState>()
```

Create a selector

```ts
const $count = createSelector($feature, state => state.count)
``` 

## Computed Properties

A convenience method is available using effects.

```ts
AppEffects.connect(
    compute($count, (count, state) => {
        state.computedValue = count + 1
    }),
)
```
