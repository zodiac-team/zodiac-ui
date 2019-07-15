# Store

Immutable application state with zero boilerplate.

**Features**

-   No reducers
-   Write, test and compose `Effects` with pure reactive functions
-   Optionally dispatch and observe actions with `ActionDispatcher`
-   Create feature stores for lazy loaded modules
-   Manage state across all stores with `GlobalStore`

**Planned**

-   Dev tools
-   Tracing
-   Tests

## Setup

```bash
npm install @zodiac-ui/store immer
```

Zodiac Store relies on `immer` to produce efficient immutable copies of the application state. For memoized
selectors, you can optionally install `reselect` or use any library/method that satisfies the `Selector` interface.

```bash
# optional
npm install reselect
```

## Example

### Root Store

Define the shape of the root store interface and create the initial state.

```typescript
export interface AppState {
    todos: TodosState[]
    todoSelected: number
}

export interface TodosState {
    id: number
    name: string
    done: boolean
}

export const initialState: AppState {
    todos: [{
        id: 1,
        name: "Write todo doco",
        done: false
    }]
    todoSelected: -1
}
```

Import and configure store module with an initial state. Use `forRoot` here.

```typescript
@NgModule({
    import: [StoreModule.forRoot(intialState)],
    declarations: [AppComponent],
})
export class AppModule {}
```

Inject the `Store` service to use it.

```typescript
@Component({
    selector: "app-root",
    template: `
        <button (click)="selectTodo()">Click</button>
    `,
})
export class AppComponent {
    constructor(public store: Store<AppState>) {
        store
            .pipe(
                // select state from store
                select(state => state.todos[state.todoSelected]),
            )
            .subscribe(todo => {
                // do something with the value when it changes
                console.log(todo)
            })
    }

    public selectTodo() {
        // Patch state with object
        this.store.next({
            todoSelected: 1,
        })

        // OR; Mutate state in producer function
        this.store.next(state => {
            state.todoSelected = 1
        })

        // OR; Patch state with object returned from producer function
        this.store.next(state => ({
            todoSelected: 1,
        }))
    }
}
```

### Feature Store

Feature stores only differ from root stores by the addition of a feature name. Use `forChild` here.

> Note: Feature stores should only be provided in lazy loaded modules (or component injectors) to prevent the root
> store being overwritten.

```typescript
export interface FeatureState {
    count: number
}

export const initialState: FeatureState = {
    count: 0
}

export const featureName = "feature"

@NgModule({
    import: [StoreModule.forChild(featureName, initialState)]
    declarations: [FeatureComponent]
})
export class FeatureModule {}

@Component({
    selector: "app-feature",
    template: `
        <ng-container *ngIf="store | async as state">
            <button (click)="increment()"></button>
            <p>{{ state.count }}</p>
        </ng-container>
    `
})
export class FeatureComponent {
    constructor(public store: Store<FeatureState>) {}

    public increment() {
        this.store.next((state) => {
            state.count += 3
        })
    }
}
```

### Effects

Import the effects module into your app module. Use `forRoot` here.

```typescript
@NgModule({
    imports: [
        StoreModule.forRoot(initialState),
        // Pass empty array if we have no effects to register
        EffectsModule.forRoot([]),
    ],
})
export class AppModule {}
```

For feature modules use `forChild`.

```typescript
@NgModule({
    // We'll populate these variables in the next step
    imports: [
        StoreModule.forChild(featureName, initialState),
        EffectsModule.forChild(featureEffects, {
            context: FeatureEffects,
        }),
    ],
})
export class FeatureModule {}
```

Create an injectable class to be used as the context for each effect.

```typescript
// Provided to EffectsModule
@Injectable()
export class FeatureEffects {
    constructor(public store: Store<FeatureState>, public effects: Effects) {}
}
```

Create an effect.

```typescript
// Countdown once per second as long as count is above zero
function countdown(ctx: FeatureEffects) {
    return ctx.store.pipe(
        select(state => state.count),
        filter(count => count > 0),
        switchMap(count => timer(1000).pipe(mapTo(count))),
        // set the store state anytime with the setState operator
        // the second argument in the producer function is the value
        // emitted by the previous operator
        setState(ctx.store, (state, count) => ({
            count: count - 1,
        })),
    )
}

// Effects can be composed using the `ofEffect()` operator
function tickTock(ctx: FeatureEffects) {
    return ctx.effects.pipe(
        ofEffect(countdown),
        // will execute whenever the countdown effect emits a value
        tap(value => console.log("tick tock", value)),
    )
}

// Provided to EffectsModule
export const featureEffects = [countdown, tickTock]
```

### Global Store

Each store maintains its own state tree separate from every other store. Since there are no reducers,
there is also no concept of meta-reducers in this library. `GlobalStore` provides access to all stores
registered in the application, allowing you to read and write to every store as if it were a single state
tree. For global state actions like saving and restoring the application state to and from local storage, use
`GlobalStore`.

```typescript
export class AppModule {
    constructor(private store: GlobalStore) {
        /**
         * The aggregated application state looks like this:
         * {
         *     root: {
         *         todos: [...],
         *         todoSelected: -1
         *     },
         *     feature: {
         *         count: 0
         *     }
         * }
        */
        store.subscribe((state) => {
            console.log(state)
        })

        /* Warning: Set global state with care, it is not type safe.
         *
         * Each top level property is mapped to the store of the same name,
         * which in turn calls `store.next(value)`, so partial values are allowed.
        */
        store.next({
            root: {
                todoSelected: 0
            },
            feature: {
                count: 10
            }
        })
    }
}
```

### Actions

So far no actions have been used to trigger effects or set the store state. There are some use cases however
where the action dispatcher can be useful.

1. A message bus that does not carry persisted state (eg. UI events, "scroll to bottom", etc.)
2. When interacting with the application through a plain text protocol (eg. window.console, redux devtools)

In such cases the `ActionDispatcher` is provided as a standalone service. It behaves exactly like an
RxJS subject.

```typescript
constructor(actions: ActionDispatcher) {
    actions.subscribe((action) => {
        console.log(action)
    })

    actions.next({ type: "ACTION_TYPE" })
}
```

#### Action Creators

Convenience methods are provided for creating actions that can also be used to filter the actions stream.
Every action must define a type with an optional payload.

```typescript
// Define an action type
export type SomeAction = Action<{
    type: "SOME_ACTION"
    payload: string
}>

// Create an action factory
export const someAction = action<SomeAction>("SOME_ACTION")
```

Use with `ActionDispatcher`

```typescript
constructor(actions: ActionDispatcher, http: HttpClient) {
    actions.pipe(
        ofAction(someAction) // equivalent to: ofAction<SomeAction>({ type: "SOME_ACTION" })
        switchMap(action => http.get(action.payload))
    ).subscribe((res) => {
        console.log(res)
    })

    actions.next(someAction("https://repl.to"))
}
```
