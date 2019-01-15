# @zodiac-ui/store

An immutable store implementation for Angular based on ngrx.

## Getting Started

Install from NPM
```
npm install @zodiac-ui/store
yarn add @zodiac-ui/store
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
    imports: [
        StoreModule.forRoot(initialState)
    ]
})
export class AppModule {}
```

### Initial State

Create an interface

```ts
export interface AppState {
    count: number
    todos: any
}
```

Define the initial state

```ts
export const initialState: AppState = {
    count: 0,
    todos: null
}
```

### Set State

In a service or component

```ts
export class ExampleComponent {
    constructor(public store: Store<AppState>) {}
    
    increment() {
        this.store.setState((state) => {
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
        <ng-container *zStore="let state of store">
            {{ state | json }}
        </ng-container>
    `
})
export class ExampleComponent {
    constructor(public store: Store<AppState>) {}
}
```

From TypeScript

```
export class ExampleComponent {
    constructor(public store: Store<AppState>) {
        store.subscribe((state) => console.log(state))
    }
}
```

### Actions
 
Create an action

```ts
@TypeOf("GET_TODOS")
export class GetTodos {
    constructor(public payload: any) {}
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
    imports: [
        EffectsModule.forRoot([AppEffects])
    ]
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

Write some effects.

```ts
AppEffects.connect((store, ctx) => {
    // Return an Observable
})
```

React to actions

```ts
AppEffects.connect((store, ctx) => {
    store.ofAction(GET_TODOS).pipe(
        switchMap((action) => ctx.http.get(action.payload)),
        tap((todos) => store.setState({ todos })
    )
})
```
