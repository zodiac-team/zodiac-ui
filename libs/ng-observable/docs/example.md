---
description: >-
    This is a simple example demonstrating most of the features of this library.
    Implementation details are extracted from the class definition and omitted for
    brevity.
---

# Example

For the best experience, each component/directive should declare a `Props` and `State` interface that describe the `@Input()` props and stateful variables of the class respectively. All template variables should be initialised with sensible defaults in the constructor to prevent undefined state.

There is no explicit handling of subscriptions in this example. Everything is managed automatically by `StreamSink` by passing it a stream of `Sinkable` objects. Change detection is queued every time `State` receives a signal via `state.next()`. Inputs are connected to the state via
`mapInputsToState` to ensure that change detection runs when the input changes. Since everything is an observable, you can completely control
what properties get updated and when change detection should run using declarative pipes to buffer or rate limit individual streams.

The end result is a component that is fully described in terms of observable inputs and outputs, with the class instance holding state snapshot
whenever the template is rendered.

```typescript
type HelloProps = Pick<HelloComponent, "title">
type HelloState = HelloProps & Pick<HelloComponent, "model" | "coords" | "user">

@Component({
    selector: "app-hello",
    template: `
        <p>Title: {{ title }}</p>
        <p>Username: {{ user?.name }}</p>
        <p>Computed Title: {{ computedTitle }}</p>
        <button (click)="btnClick.next($event)">Click me</button>
        <input [value]="model" (change)="modelChange($event)" />
        <p>Last coords:</p>
        <pre>{{ "{" }} x: {{ coords?.screenX || 0 }}, y: {{ coords?.screenY || 0 }} {{ "}" }}</pre>
    `,
    styleUrls: ["./hello.component.scss"],
    viewProviders: [StateFactory],
})
export class HelloComponent extends NgObservable<HelloProps> {
    @Input()
    readonly title: string = "" // local props

    @Computed<string>(computeTitle)
    readonly computedTitle: string = "" // computed state

    readonly model: string = "test" // local state
    readonly coords: Coords | null = null // local state
    readonly user: User | null = null // global state

    @HostListener("mousemove", ["$event"])
    public mousemove = new InvokeSubject<Event>()

    @HostListener("click", ["$event"])
    readonly hostClick = new InvokeSubject<MouseEvent>()

    @Output()
    readonly btnClick = new InvokeSubject<MouseEvent>()

    readonly modelChange = new InvokeSubject<Event>()

    private state: State<HelloState>

    constructor(
        @Self() stateFactory: StateFactory<HelloState>,
        someService: SomeService,
        store: Store<AppState>,
    ) {
        super()

        this.state = stateFactory.create(this)

        const { mousemove, modelChange, state } = this

        this.sink = merge(
            mapInputsToState(this),
            setUser(store), // select user from store
            setCoords(mousemove), // get mouse event coords
            setData(someService, getModel(state)), // get data from someService whenever model changes
            setModel(modelChange), // set the model whenever it changes
        ).pipe(stream(state))
    }

    // Lifecycle decorators run immediately after the related lifecycle hook
    @NgOnChanges()
    logInputChanges(changes: TypedChanges<HelloProps>) {
        console.log(changes)
    }
}
```
