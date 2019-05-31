# NgObservable

Create powerful reactive components with Angular.

-   🚀 Observe lifecycle hooks such as `ngOnInit`, `ngOnChanges`
-   🎉 Convert `HostListener` and template events into observable streams
-   ✈️ Manage and observe state changes in your components and directives
-   ☑️ Unlock blazing performance with zoneless, observable change detection
-   💥 Use `@Decorators` for all of the builtin lifecycle hooks
-   🍷 Derive computed values with the `@Computed` decorator
-   🚫 Escape async hell and redundant placeholder variables
-   🚮 Automatically clean up subscriptions with `Stream`
-   🎈 Get strongly typed changes with `TypedChanges<T>`
-   👉 Extract implementation details into pure reactive functions

## Setup

```bash
npm install @zodiac-ui/ng-observable
```

### Configure `State` (optional)

To get started with `State`, some additional configuration is needed.

The `State` utility provides its own change detection strategy that does not depend on zones. How this differs from
normal change detection is illustrated below.

|            | Zones | `Microtask` | `Macrotask` | `(event)` | `@Input()` | `next()` |
| ---------- | ----- | ----------- | ----------- | --------- | ---------- | -------- |
| `Default`  | Yes   | ✅          | ✅          | ✅        | ✅         |          |
| `OnPush`   | Yes   |             |             | ✅        | ✅         |          |
| `OnPush`   | No    |             |             |           | ✅         |          |
| `REATTACH` | Yes   |             |             | ✅        | ✅         | ✅       |
| `REATTACH` | No    |             |             |           | ✅         | ✅       |
| `DETACH`   | N/A   |             |             |           |            | ✅       |

#### Set a default `StateChangeStrategy`

Add a default `StateChangeStrategy` to your root component.

```typescript
@Component({
    providers: [useStateChangeStrategy(StateChangeStrategy.DETACH)], // Or REATTACH if using zones
})
export class AppComponent {}
```

#### Remove `zone.js`

If any parts of your project or dependencies (such as `@angular/material`) rely on `zone.js` for change detection,
skip this step.

1. Remove the `zone.js` polyfill

```typescript
// polyfills.ts

import "zone.js/dist/zone" // <-- Remove this line
```

2. Configure `platformBrowserDynamic` to use `"noop"` zones:

If using `Render3` from ivy beta, skip this step.

```typescript
// main.ts

platformBrowserDynamic()
    .bootstrapModule(AppModule, {
        ngZone: "noop", // <-- Add this line
    })
    .catch(err => console.error(err))
```


## Example

For the best experience, each component/directive should declare a `Props` and `State` interface that describe the `@Input()` props and stateful variables of the class respectively. All template variables should be initialised with sensible defaults in the constructor to prevent undefined state.

There is no explicit handling of subscriptions in this example. Everything is managed automatically by `Stream`. Change detection is queued every time `State` receives a signal via `state.next()`. Inputs are connected to the state via
`mapInputsToState` to ensure that change detection runs when the input changes. Since everything is an observable, you can completely control
what properties get updated and when change detection should run using operators to buffer or rate limit individual streams.

The end result is a component that is fully described in terms of observable inputs and outputs.

```typescript

function setUser(source: Store<AppState>) {
    return source.pipe(
        select(fromStore),
        map(user => ({ user })),
    )
}

function setCoords(source: Observable<MouseEvent>) {
    return source.pipe(map(coords => ({ coords })))
}

function setData<T>(
    source: SomeService,
    title: Observable<string>,
): Observable<{ user: User }> {
    return title.pipe(
        switchMap(ctx => source.getSomething(ctx)),
        map(user => ({ user })),
    )
}

function setModel(source: Observable<Event>) {
    return source.pipe(
        ofEventTarget(HTMLInputElement),
        map(event => ({
            model: event.target.value,
        })),
    )
}

function getModel(source: Observable<HelloProps>) {
    return source.pipe(
        select(ctx => ctx.title),
        delay(1000),
    )
}

function computeTitle() {
    return (state: HelloState) => state.innerTitle + 123
}

interface User {
    name: string
}

interface AppState {
    user: User
}

interface Coords {
    screenX: number,
    screenY: number
}

type HelloProps = Pick<HelloComponent, "title">
type HelloState = HelloProps & Pick<HelloComponent, "innerTitle" | "model" | "coords" | "user">

export class HelloComponent extends NgObservable implements HelloProps, HelloState {
    @Input()
    readonly title: string = "" // local props

    @Output()
    readonly btnClick = new InvokeSubject<MouseEvent>()

    @Computed<string>(computeTitle)
    readonly computedTitle: string = "" // computed state

    @HostListener("mousemove", ["$event"])
    public mousemove = new InvokeSubject<MouseEvent>()

    @HostListener("click", ["$event"])
    readonly hostClick = new InvokeSubject<MouseEvent>()

    @ViewChild("buttonRef", { static: true })
    buttonRef: ElementRef<HTMLButtonElement> | null = null

    readonly modelChange = new InvokeSubject<Event>()
    readonly innerTitle: string = ""
    readonly model: string = "test" // local state
    readonly coords: Coords | null = null // local state
    readonly user: User | null = null // global state

    constructor(
        @Self() stateFactory: StateFactory<HelloState>,
        @Self() stream: Stream,
        someService: SomeService,
        store: Store<AppState>,
    ) {
        super()
        const state = stateFactory.create(this)
        const { hostClick, modelChange, mousemove } = this

        stream(state.patchValue)(setCoords(mousemove)) // set the value of coords without triggering change detection

        stream(state)(
            setInnerTitle(mapInputsToState(this)), // map props to state
            setUser(store), // select user from store
            mapTo({})(hostClick), // trigger change detection when clicked without modifying state
            setData(someService, getModel(state)), // get data from someService whenever model changes
            setModel(modelChange), // set the model whenever it changes
        )

        // Create lifecycle hook observables
        ngOnInit(this).subscribe(() => {
            // will be defined in ngOnInit because of static resolution
            console.log(this.buttonRef)
        })
    }

    // Or decorate class methods. Important: Do not override base lifecycle methods. Rename or remove them instead.
    @NgOnChanges()
    public runOnChanges(changes: TypedChanges<HelloProps>) {
        // runs during OnChanges hook
        if (changes.title) {
            console.log(changes.title.currentValue) // typed to "string"
        }
    }
}
```
