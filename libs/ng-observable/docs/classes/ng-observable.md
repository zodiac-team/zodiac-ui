# `NgObservable<T>`

## Usage

```typescript
export interface MyProps {
    title: string
}

@Component()
export class MyComponent extends NgObservable<MyProps> {}
```

## Override default lifecycle hooks

`NgObservable<T>` emits the following lifecycle events by default:

-   `ON_INIT`
-   `ON_CHANGES`
-   `ON_CONTENT_INIT`
-   `ON_VIEW_INIT`
-   `ON_DESTROY`

To change this per component instance, pass in flags through the constructor:

```typescript
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        super(DO_CHECK) // only emit ngDoCheck events
    }
}

@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        super(ON_INIT, ON_DESTROY) // only emit ngOnInit and ngOnDestroy events
    }
}
```

## Subscribing to lifecycle events

`NgObservable<T>` turns your component into an observable that emits lifecycle events. To listen to these events, subscribe to your component:

```typescript
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        this.subscribe(event => console.log(event))
    }
}
```

Use operators to listen for specific events:

```typescript
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        ngOnInit(this) // fires once after ngOnInit
            .subscribe(() => console.log("init!"))

        ngOnChanges(this) // fires after each ngOnChanges
            // changes are strongly typed to TypedChanges<MyProps>
            .subscribe(changes => console.log(changes))
    }
}
```

These will be cleaned up automatically when the component or directive is destroyed.

## StreamSink

For convenience the `NgObservable<T>` class provides a sink for your observable streams that will automatically clean up any subscriptions when the component or directive is destroyed

```typescript
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor(myService: MyService) {
        this.sink = ngOnInit(this).pipe(
            switchMapTo(myService.longRunningPoll()),
            stream(result => {
                console.log(result)
            }),
        )
    }
}
```

## Decorator Hooks

The constructor might not be the best place to initialise streams. Hooks let you decorate any method to be called after a particular lifecycle event. The benefit of this over using the normal angular hooks?

1. Hooks can decorate multiple methods
2. Methods can be named semantically
3. Don't need to override base methods

```typescript
@Component()
export class MyComponent extends NgObservable<MyProps> {
    @Input() title: string
    constructor(myService: MyService) {
        this.title = ""
    }

    @NgOnInit()
    public subscribeToLongRunningPoll() {
        // this will sink and return the observable, which can be useful for testing
        return this.sink = myService.longRunningPoll().pipe(
            stream((result) => {
               console.log(result)
            })
        )
    }

    @NgOnInit()
    public logInit() {
        console.log(`
            This will run first, since decorators are
            evaluated from bottom to top
        `)
    }
```

## API

Inherits from `Observable<NgHooksEvent<T>>`

| Property | Type       | Description                              |
| :------- | :--------- | :--------------------------------------- |
| `sink`   | `Sinkable` | Sink a stream through object assignment. |
