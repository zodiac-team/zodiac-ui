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
writing actions and reducers, all state modifications are performed with a `setState` function and computed properties.
Zodiac Store also offers a more powerful effects module that lets you take full advantage of reactive streams. If
effects aren't your thing, services work just as well.

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
    todosLoaded: boolean
}
```

Define the initial state getter

```ts
export function initialState(): InitialState<AppState> {
    return {
        count: 0,
        todos: null,
        todosLoaded: false,
    }
}
```

### Selectors

Create a feature selector

```ts
const $feature = createFeatureSelector<AppState>()
```

Create a selector

```ts
const $count = createSelector(
    $feature,
    state => state.count,
)
```

## Computed Properties

Extend the app state interface to include computed properties

```ts
export interface AppState {
    count: number
    todos: any
    todosLoaded: boolean
    computedValue: number
}
```

Create a selector. This can also be used to read the state later

```
const $computedValue = createSelector(
    $count,
    count => count + 1,
)
```

Extend the initial state getter

```ts
export function initialState(): InitialState<AppState> {
    return {
        count: 0,
        todos: null,
        computedValue: $computedValue,
    }
}
```

Computed properties are evaluated in the same microtask queue. Use memoized selectors to prevent unnecessary recalculations

For default values in computed properties, return them from the selector function. You can freely chain
computed properties together if they don't cause circular references

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
        store.pipe(select($count).subscribe(count => console.log(count))

        // Snapshot
        const count = $count(store.state)
    }
}
```

### Set State

In a component

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

In a service

```ts
export class ExampleService {
    constructor(private store: Store<AppState>, private http: HttpClient) {}

    async loadTodos(url) {
        const todos = await this.http.get(url).toPromise()

        this.store.setState({ todos })
    }
}
```

In an observable stream

```ts
export class ExampleService {
    constructor(private store: Store<AppState>, private http: HttpClient) {}

    loadTodos(url) {
        this.http
            .get(url)
            .pipe(
                setState(this.store, (todos, state) => {
                    state.todos = todos
                }),
            )
            .subscribe()
    }
}
```

### Actions

Create an action. Actions are used to trigger effects.

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

Listen for an action

```ts
export class ExampleService {
    constructor(actions: Actions) {
        actions.pipe(
            ofAction(GetTodos),
            tap(action => console.log(action)),
        )
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
    static connect = createConnector<AppEffects>()
    constructor(
        public http: HttpClient,
        public store: Store<AppState>,
        public actions: Actions,
        public effects: Effects,
    ) {}
}
```

Write some effects

```ts
const someEffect = AppEffects.connect((store, ctx) => {
    // Return any Observable
})
```

React to actions

```ts
const loadTodos = AppEffects.connect((ctx) => (
    ctx.actions(GetTodos).pipe(
        switchMap((action) => ctx.http.get(action.payload)),
        tap((todos) => store.setState({ todos })
    )
))

```

React to effects

```ts
const afterLoadTodos = AppEffects.connect((ctx) => (
    ctx.effects.pipe(
        ofEffect(loadTodos),
        setState(ctx.store, (_, state) => {
            state.todosLoaded = true
        })
    )
)
```

### Feature Modules

In a lazy loaded module, import the store. For feature effects also import the effects module

```ts
@NgModule({
    imports: [
        StoreModule.forChild("feature", initialState),
        EffectsModule.forChild([FeatureEffects]),
    ],
})
export class FeatureModule {}
```

Feature stores are configured the same way as the root store

```
export interface FeatureState {
    count: number
    computedValue: number
}

export const $feature = createFeatureSelector<FeatureState>()
export const $computedValue = createSelector($feature, (state) => state.count * -1)

export function initialState(): InitialState<FeatureState> {
    return {
        count: 0,
        computedValue: $computedValue
    }
}

@Injectable()
export class FeatureEffects {
    static connect = createConnector<FeatureEffects>()
    constructor(public store: Store<FeatureState>) {}
}

FeatureEffects.connect(ctx => {
    return interval(1000).pipe(
        setState(ctx.store, (_, state) => {
            state.count = Math.max(0, state.count - 1)
        }),
    )
})
```
