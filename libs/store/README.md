# @zodiac-ui/store

An immutable store implementation for Angular based on ngrx.

## Table of Contents

-   [Early Access](#early-access)
-   [Getting Started](#getting-started)
-   [Introduction](#introduction)
-   [Usage](#usage)
    -   [Initial State](#initial-state)
    -   [Selectors](#selectors)
    -   [Computed Properties](#computed-properties)
    -   [Read State](#read-state)
    -   [Set State](#set-state)
    -   [Actions](#actions)
    -   [Effects](#effects)
    -   [Feature Modules](#feature-modules)
    -   [Redux Devtools](#redux-devtools)
-   [Api](#api)
    -   [Store](#store)
        -   [state](#state)
        -   [dispatch(action)](#dispatchaction)
        -   [setState(setter)](#setstatesetter)
        -   [select(selector)](#selectselector)
        -   [subscribe(2 overloads)](#subscribe2-overloads)
    -   [StoreDirective](#storedirective)
        -   [StoreContext](#storecontext)
    -   [Operators](#operators)
        -   [dispatch(store, setter)](#dispatchstore-setter)
        -   [setState(store, setter)](#setstatestore-setter)
        -   [select(selector)](#selectselectorspan-stylecolor-transparent2span)
        -   [ofAction(action)](#ofactionaction)
        -   [ofEffect(effect)](#ofeffecteffect)
        -   [withLatestState(store)](#withlateststatestore)
    -   [Utils](#utils)
        -   [@OfType(type)](#oftypetype)
        -   [createConnector\<T\>()](#createconnectort)
        -   [createFeatureSelector()](#createfeatureselector)
        -   [createSelector(97 overloads)](#createselector97-overloads)

## Early Access

Zodiac Store is being actively developed. Please do not use this in production.

## Getting Started

Install from NPM

```
npm install @zodiac-ui/store immer reselect
yarn add @zodiac-ui/store immer reselect
```

## Introduction

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

### Computed Properties

Extend the app state interface to include computed properties

```ts
export interface AppState {
    count: number
    todos: any[]
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
        todosLoaded: boolean,
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
const loadTodos = AppEffects.connect(ctx =>
    ctx.actions(GetTodos).pipe(
        switchMap(action => ctx.http.get(action.payload)),
        setState(ctx.store, (state, todos) => {
            state.todos = todos
        }),
    ),
)
```

React to effects

```ts
const afterLoadTodos = AppEffects.connect((ctx) => (
    ctx.effects.pipe(
        ofEffect(loadTodos),
        setState(ctx.store, (state) => {
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

```ts
export interface FeatureState {
    count: number
    computedValue: number
}

export const $feature = createFeatureSelector<FeatureState>()
export const $computedValue = createSelector(
    $feature,
    state => state.count * -1,
)

export function initialState(): InitialState<FeatureState> {
    return {
        count: 0,
        computedValue: $computedValue,
    }
}

@Injectable()
export class FeatureEffects {
    static connect = createConnector<FeatureEffects>()
    constructor(public store: Store<FeatureState>) {}
}

FeatureEffects.connect(ctx => {
    return interval(1000).pipe(
        setState(ctx.store, state => {
            state.count = Math.max(0, state.count - 1)
        }),
    )
})
```

### Redux Devtools

Zodiac Store has basic support for the [redux devtools extension](https://github.com/zalmoxisus/redux-devtools-extension)

Import the store devtools module in the main app module

```ts
    imports: [
        StoreModule.forChild("feature", initialState),
        StoreDevtoolsModule.config({
            maxAge: 50
        }),
    ],
```

To update state from the dispatcher, send the following JSON payload. Computed properties should not be set,
as they will update automatically.

```ts
// Payload to send from Redux Devtools Extension dispatcher
{
    "setState": {
        count: 10
        ... // Replace entire state or apply patch
    }
}
```

Changes are applied partially to the state of the root store and the state of each feature.

```ts
{
    "setState": {
        "feature": {
            "count": 4 // Only updates count
        }
    }
}
```

If updating an object on a root or feature node, the entire object will be replaced.

```ts
{
    "setState": {
        // Replaces the todos array
        todos: [{
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        }]
    }
}
```

Actions can also be dispatched to trigger effects

```ts
{
    "type": "GET_TODOS",
    "payload: "http://..."
}
```

## Api

### Store

#### state

A getter that returns an immutable snapshot of the current state

| Returns |
| :------ |
| `T`     |

#### dispatch(action)

Immediately dispatches an action globally to the actions stream

| Param         | Description                                                               |
| :------------ | :------------------------------------------------------------------------ |
| `action: any` | Any plain javascript object, usually with a `type` and optional `payload` |

| Returns |
| :------ |
| `void`  |

#### setState(setter)

Accepts an object for partially or wholly replacing the previous state, or a producer function. Calls
to `setState` are batched to prevent unnecessary change detections and can be called multiple times in the same tick.
Objects are only shallow copied, so the state should be kept as flat as possible. Use [Computed Properties](#computed-properties) for values
that are derived from state.

| Param                       | Description                                                                                                            |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `setter: (state: T) => any` | A producer function passed directly to `immer`. Throws if return value is not void and does not match state signature. |
| `setter: Partial<T>`        | A plain object that partially or wholly replaces the store state.                                                      |

| Returns |
| :------ |
| `void`  |

#### select(selector)

Returns an observable that is derived from state and emits a new value whenever the state changes. Pass a memoized selector to
prevent performance issues in heavy computations

| Param                          | Description                                                     |
| :----------------------------- | :-------------------------------------------------------------- |
| `selector: <U>(state: T) => U` | A selector function that returns a value derived from the state |

| Returns         |
| :-------------- |
| `Observable<U>` |

#### subscribe(2 overloads)

Inherited from `Observable`

Emits the entire state whenever the state changes. Use with the `select`, `dispatch` and `setState` operators to create
reactive streams

| Returns         |
| :-------------- |
| `Observable<T>` |

---

### StoreDirective

selectors: `[zStore][zStoreIn]`

Automatically subscribes/unsubscribes from the store and performs change detection whenever the state changes.
The embedded view is created immediately with the initial state that was passed in to the store module.

```ts
<ng-container *zStore="let state; in: store"></ng-container>
```

#### StoreContext

| Property    | Description                                                     |
| :---------- | :-------------------------------------------------------------- |
| `$implicit` | A selector function that returns a value derived from the state |

---

### Operators

A number of useful operators are included for composing reactive streams

#### dispatch(store, setter)

Taps a store to immediately dispatch an action. Returns the source Observable for further chaining.

| Param                                | Description                                                                                    |
| :----------------------------------- | :--------------------------------------------------------------------------------------------- |
| `store: StoreLike<T>`                | An object that implements the `StoreLike` interface                                            |
| `setter: any`                        | An action to dispatch, usually with a `type` and optional `payload`                            |
| `setter: (context: inferred) => any` | A function that returns an action, with the upstream observable value passed in as a paramater |

| Returns                |
| :--------------------- |
| `Observable<inferred>` |

#### setState(store, setter)

Taps a store to immediately update its state. Returns the source Observable for further chaining.

| Param                                          | Description                                                                                                                                                                                  |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store: StoreLike<T>`                          | An object that implements the `StoreLike` interface                                                                                                                                          |
| `setter: (state: T, context: inferred) => any` | A producer function passed directly to `immer`. Throws if return value is not void and does not match state signature. The upstream observable value is also passed in as a second parameter |
| `setter: Partial<T>`                           | A plain object that partially or wholly replaces the store state.                                                                                                                            |

| Returns                |
| :--------------------- |
| `Observable<inferred>` |

#### select(selector)<span style="color: transparent">2</span>

Functionally identical to [select](#selectselector), except it can be used to derive a value from any source Observable

| Param                          | Description                                                     |
| :----------------------------- | :-------------------------------------------------------------- |
| `selector: <U>(state: T) => U` | A selector function that returns a value derived from the state |

| Returns         |
| :-------------- |
| `Observable<U>` |

#### ofAction(action)

Filter the actions stream to a subset of values based on its `type`

| Param             | Description                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `action: Type<U>` | A class token that instantiates an action with the same `type`. Must be decorated with the [OfType](#oftypetype) annotation |

| Returns         |
| :-------------- |
| `Observable<U>` |

#### ofEffect(effect)

Filter the effects stream to a subset of values based on its identity

| Param                                       | Description                                                                |
| :------------------------------------------ | :------------------------------------------------------------------------- |
| `effect: (...args: any[]) => Observable<T>` | A reference to an effect created using [createConnector](#createconnector) |

| Returns         |
| :-------------- |
| `Observable<U>` |

#### withLatestState(store)

A more semantic version of `WithLatestFrom`, typed to the state of the store that is passed in

| Param                 | Description                                         |
| :-------------------- | :-------------------------------------------------- |
| `store: StoreLike<T>` | An object that implements the `StoreLike` interface |

| Returns         |
| :-------------- |
| `Observable<T>` |

---

### Utils

#### @OfType(type)

Each Action class should have a unique `type` as annotated by this decorator. Needed for [ofAction](#ofactionaction) to
match against the action type

#### createConnector\<T\>()

Creates a strongly typed factory for registering [Effects](#effects). Effects created with the factory can be assigned
to variables for testing or chaining using the [ofEffect](#ofeffecteffect) operator

| Returns                                                                 |
| :---------------------------------------------------------------------- |
| `(connectFn: ConnectFnWithContext<T, V>) => ConnectFnWithContext<T, V>` |

#### createFeatureSelector()

Creates a memoized feature selector that returns the root state of the store.

| Returns            |
| :----------------- |
| `Selector<any, T>` |

#### createSelector(97 overloads)

Creates a memoized selector that returns the selected state. Provided by `reselect`

| Returns          |
| :--------------- |
| `Selector<T, U>` |
