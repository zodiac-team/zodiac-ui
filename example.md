---
description: >-
  This is a simple example demonstrating most of the features of this library.
  Implementation details are extracted from the class definition and omitted for
  brevity.
---

# Example

For the best experience, each component/directive should implement a `Props` and `State` interface that describe the `@Input()` props and mutable state of the class respectively. All template variables should be initialised with defaults in the constructor to prevent undefined state. With this we can minimise or eliminate the usage of `*ngIf` which can clutter the template with unnecessary guards.

Another thing to note here is that there is no explicit subscriptions or unsubscriptions to observables. Everything is managed automatically by `StreamSink`. We can set the change detection strategy to `OnPush` and not worry about manually triggering change detection or binding to async pipes thanks to `State`. After binding it to the class instance, `State` patches the properties and triggers change detection whenever it receives a new value. Interfaces are used here to limit what can and can't be set.

The end result is a component that is fully described by observable streams, with the class instance acting as a snapshot of the state whenever the template is rendered.

```typescript
interface HelloProps {
    title: string
}

// If we want props to be immutable, don't add them here
interface HelloState extends HelloProps {
    readonly computedTitle: string // computed values should be readonly here
    username: string
    model: string
    coords: MouseEvent | null
}

@Component({
    selector: "app-hello",
    template: `
        <p>Title: {{ title }}</p>
        <p>Username: {{ username }}</p>
        <p>Computed Title: {{ computedTitle }}</p>
        <button (click)="btnClick($event)">Click me</button>
        <input [value]="model" (change)="modelChange($event)" />
    `,
    styleUrls: ["./hello.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [StateFactory],
})
export class HelloComponent extends NgObservable<HelloProps> implements HelloState {
    @Input()
    readonly title: string // local props

    @Computed<string>(computeTitle)
    readonly computedTitle: string // computed state

    @Output() // Since a subject is also an observable...
    @HostListener("click", ["$event"])
    readonly hostClick: InvokeSubject<MouseEvent>

    readonly model: string // local state
    readonly username: string // global state
    readonly coords: MouseEvent | null
    readonly btnClick: InvokeSubject<MouseEvent>
    readonly modelChange: InvokeSubject<Event>

    private readonly state: State<HelloState>
    private readonly someService: SomeService
    private readonly store: Store<AppStore>

    constructor(
        @Self() stateFactory: StateFactory<HelloState>,
        store: Store<AppStore>,
        someService: SomeService
    ) {
        super()

        this.title = "title"
        this.model = ""
        this.username = ""
        this.coords = null
        this.hostClick = new InvokeSubject()
        this.btnClick = new InvokeSubject()
        this.modelChange = new InvokeSubject()
        this.state = stateFactory.create(this, mapPropsToState(this))
        this.someService = someService
        this.store = store
        this.computedTitle = ""
    }

    @NgOnInit()
    public runOnInit() {
        // Stream changes from store and map to local state
        this.sink = stream(this.state)(selectStore(this.store))

        // Stream of clicks on host element
        this.sink = stream(this.state)(getCoords(this.hostClick))

        // Stream of clicks to template button element
        this.sink = stream(this.state)(setTitle(this.btnClick))

        // Stream result of an async service
        this.sink = stream(this.state)(this.someService.getSomething(this.title))

        // Stream model changes to update state
        this.sink = this.modelChange.pipe(
            ofEventTarget(HTMLInputElement),
            map(event => ({
                model: event.target.value,
            })),
            stream(this.state),
        )
    }
}
```

