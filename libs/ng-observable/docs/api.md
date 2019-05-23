# API Reference

- [API Reference](#api-reference)
  * [Classes](#classes)
    + [`NgObservable<T>`](#-ngobservable-t--)
    + [Usage](#usage)
      - [Override default lifecycle hooks](#override-default-lifecycle-hooks)
      - [Subscribing to lifecycle events](#subscribing-to-lifecycle-events)
      - [StreamSink](#streamsink)
      - [Decorator Hooks](#decorator-hooks)
      - [API](#api)
    + [`StreamSink`](#-streamsink-)
      - [Usage](#usage-1)
      - [API](#api-1)
    + [`StateFactory<T>`](#-statefactory-t--)
      - [Usage](#usage-2)
      - [API](#api-2)
    + [`State<T>`](#-state-t--)
      - [Usage](#usage-3)
        * [Mapping `@Input()` props to `State<T>`](#mapping---input----props-to--state-t--)
      - [API](#api-3)
    + [`InvokeSubject<T>`](#-invokesubject-t--)
      - [Usage](#usage-4)
      - [API](#api-4)
  * [Decorators](#decorators)
    + [`@Computed<T>`](#--computed-t--)
      - [Usage](#usage-5)
      - [API](#api-5)
    + [`@NgOnInit`](#--ngoninit-)
      - [Usage](#usage-6)
      - [API](#api-6)
    + [`@NgOnChanges`](#--ngonchanges-)
      - [Usage](#usage-7)
      - [API](#api-7)
    + [`@NgDoCheck`](#--ngdocheck-)
      - [Usage](#usage-8)
      - [API](#api-8)
    + [`@NgAfterContentInit`](#--ngaftercontentinit-)
      - [Usage](#usage-9)
      - [API](#api-9)
    + [`@NgAfterContentChecked`](#--ngaftercontentchecked-)
      - [Usage](#usage-10)
      - [API](#api-10)
    + [`@NgAfterViewInit`](#--ngafterviewinit-)
      - [Usage](#usage-11)
      - [API](#api-11)
    + [`@NgAfterViewChecked`](#--ngafterviewchecked-)
      - [Usage](#usage-12)
      - [API](#api-12)
    + [`@NgOnDestroy`](#--ngondestroy-)
      - [Usage](#usage-13)
      - [API](#api-13)
  * [Operators](#operators)
    + [`ngOnChanges`](#-ngonchanges-)
      - [Usage](#usage-14)
      - [API](#api-14)
    + [`ngOnInit`](#-ngoninit-)
      - [Usage](#usage-15)
      - [API](#api-15)
    + [`ngDoCheck`](#-ngdocheck-)
      - [Usage](#usage-16)
      - [API](#api-16)
    + [`ngAfterContentInit`](#-ngaftercontentinit-)
      - [Usage](#usage-17)
      - [API](#api-17)
    + [`ngAfterContentChecked`](#-ngaftercontentchecked-)
      - [Usage](#usage-18)
      - [API](#api-18)
    + [`ngAfterViewInit`](#-ngafterviewinit-)
      - [Usage](#usage-19)
      - [API](#api-19)
    + [`ngAfterViewChecked`](#-ngafterviewchecked-)
      - [Usage](#usage-20)
      - [API](#api-20)
    + [`ngOnDestroy`](#-ngondestroy-)
      - [Usage](#usage-21)
      - [API](#api-21)
    + [`select<T, U>`](#-select-t--u--)
      - [Usage](#usage-22)
      - [API](#api-22)
    + [`stream<T>`](#-stream-t--)
      - [Usage](#usage-23)
      - [API](#api-23)
  * [Interfaces](#interfaces)
    + [`NgHooksEvent<T>`](#-nghooksevent-t--)
    + [`TypedChanges<T>`](#-typedchanges-t--)
    + [`TypedChange<T>`](#-typedchange-t--)
    + [`Sinkable`](#-sinkable-)
  * [Utils](#utils)
    + [`unsubscribe`](#-unsubscribe-)
      - [Usage](#usage-24)
  * [Providers](#providers)
    + [`useDefaultLifecycleHooks`](#-usedefaultlifecyclehooks-)
      - [Usage](#usage-25)
  * [Constants](#constants)
    + [`NgHooksEventType`](#-nghookseventtype-)
    + [`ON_CHANGES`](#-on-changes-)
    + [`ON_INIT`](#-on-init-)
    + [`DO_CHECK`](#-do-check-)
    + [`AFTER_CONTENT_INIT`](#-after-content-init-)
    + [`AFTER_CONTENT_CHECKED`](#-after-content-checked-)
    + [`AFTER_VIEW_INIT`](#-after-view-init-)
    + [`AFTER_VIEW_CHECKED`](#-after-view-checked-)
    + [`ON_DESTROY`](#-on-destroy-)
    + [`LIFECYCLE_FLAGS`](#-lifecycle-flags-)

## Classes

### `NgObservable<T>`

### Usage

```typescript
export interface MyProps {
    title: string
}

@Component()
export class MyComponent extends NgObservable<MyProps> {}
```

#### Override default lifecycle hooks

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

#### Subscribing to lifecycle events

`NgObservable<T>` turns your component into an observable that emits lifecycle events. To listen to these
events, subscribe to your component:

```
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        this.subscribe((event) => console.log(event))
    }
}
```

Use operators to listen for specific events:

```
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        ngOnInit(this) // fires once after ngOnInit
            .subscribe(() => console.log("init!"))

        ngOnChanges(this) // fires after each ngOnChanges
            // changes are strongly typed to TypedChanges<MyProps>
            .subscribe((changes) => console.log(changes))
    }
}
```

These will be cleaned up automatically when the component or directive is destroyed.

#### StreamSink

For convenience the `NgObservable<T>` class provides a sink for your observable streams that will automatically
clean up any subscriptions when the component or directive is destroyed

```
@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor(myService: MyService) {
        this.sink = ngOnInit(this).pipe(
            switchMapTo(myService.longRunningPoll()),
            stream((result) => {
                console.log(result)
            })
        )
    }
}
```

#### Decorator Hooks

The constructor might not be the best place to initialise streams. Hooks let you decorate any method to be
called after a particular lifecycle event. The benefit of this over using the normal angular hooks?

1. Hooks can decorate multiple methods
2. Methods can be named semantically
3. Don't need to override base methods

```
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

#### API

Inherits from `Observable<NgHooksEvent<T>>`

| Property | Type       | Description                              |
| :------- | :--------- | :--------------------------------------- |
| `sink`   | `Sinkable` | Sink a stream through object assignment. |

### `StreamSink`

A convenience object for cleaning up multiple streams when they are no longer needed.

#### Usage

With `NgObservable<T>`

```typescript
export interface MyProps {
    title: string
}

@Component()
export class MyComponent extends NgObservable<MyProps> {
    constructor() {
        super()

        this.sink = stream(noop)(interval(1000))
        this.sink.sinkAll(...[1, 2, 3].map((value) => stream(noop)(of(value)))
    }
}
```

With any class

```typescript
@Injectable()
export class MyService implements OnDestroy() {
    constructor() {
        this.stream = new SteamSink()
        this.stream.sink = stream(noop)(interval(1000))
    }

    ngOnDestroy() {
        // Unsubscribe all streams attached
        this.stream.complete()
    }
}
```

#### API

| Property      | Type                                | Description                              |
| :------------ | :---------------------------------- | :--------------------------------------- |
| `sinkAll`     | `(...sinkables: Sinkables[]): void` | Sink all streams passed to it.           |
| `sink`        | `Sinkable`                          | Sink a stream through object assignment. |
| `close`       | `(): void`                          | Close and dispose of all streams.        |
| `ngOnDestroy` | `(): void`                          | OnDestroy lifecycle hook                 |

### `StateFactory<T>`

Injectable class that is optionally bound to a directive's `ChangeDetectorRef` if provided.

#### Usage

```typescript
interferface MyState {
    title: string
}

@Component({
    viewProviders: [StateFactory]
})
export class MyComponent implements MyState {
    constructor(@Self() stateFactory: StateFactory<MyState>) {
        this.state = stateFactory.create(this)
     }
}
```

#### API

| Property | Type                                                            | Description           |
| :------- | :-------------------------------------------------------------- | :-------------------- |
| `create` | `(value: T, notifier: Observable<Partial<T> or void): State<T>` | Create a state object |

### `State<T>`

Centralised state management service for Angular components and directives. To be used with
`ChangeDetectionStrategy.OnPush`.

#### Usage

The basic usage is to create a `State<T>` object using the class instance as the state container.

```typescript
export interface MyProps {
    title: string
}

export interface MyState extends MyProps {
    model: string
}

@Component()
export class MyComponent implements MyState {
    @Input()
    title: string
    model: string

    constructor(@Self() stateFactory: StateFactory<MyState>) {
        this.state = stateFactory.create(this)
    }
}
```

##### Mapping `@Input()` props to `State<T>`

> This step is optional if you don't need to subscribe to `@Input()`
> changes.

To keep the state in sync with `@Input()` props it is necessary to notify the `State<T>`
when changes are made. Here's a couple of options:

Notify with `OnChanges`:

```typescript
public ngOnChanges() {
    this.state.next() // Angular updates input props so they can be omitted here
}
```

Notify with `NgObservable<T>`:

```typescript
export class MyComponent extends NgObservable<MyProps> implements MyState {
    constructor(@Self() stateFactory: StateFactory<MyState>) {
        this.state = stateFactory.create(this, mapPropsToState(this))
    }
}
```

> Note: `mapPropsToState` assumes that `MyState` extends `MyProps`. If you would rather map
> props to state differently, consider using the `ngOnChanges` operator.

#### API

Inherits from `BehaviorSubject<T>`

| Property        | Type                       | Description                                        |
| :-------------- | :------------------------- | :------------------------------------------------- |
| `value`         | `readonly T`               | The current value of the state                     |
| `next()`        | `(partialState?: T): void` | Update the state and queue a change detection run. |
| `unsubscribe()` | `(): void`                 | Close the state and unsubscribe from notifiers.    |
| `ngOnDestroy`   | `(): void`                 | OnDestroy lifecycle hook                           |

### `InvokeSubject<T>`

A subject that implements both `Subject<T>` and `Function` interfaces. Using this subject
in place of a normal method turns all invocations of that method into an observable stream without
needing to modify the source of the caller. When called with multiple arguments it will emit the
arguments as an array.

#### Usage

```typescript
@Component({
    template: `<input (change)="inputChanges($event)"></button>`
})
export class MyComponent implements OnDestroy {
    @HostListener("click", ["$event"])
    readonly hostClick = new InvokeSubject<MouseEvent>
    readonly inputChanges = new InvokeSubject<Event>

    constructor() {
        hostClick.subscribe((event) => console.log(event))
        inputChanges.subscribe((event) => console.log(event))
    }
}
```

#### API

Inherits from `Function` and `Subject<T>`.

| Property       | Type                   | Description                         |
| :------------- | :--------------------- | :---------------------------------- |
| `[[Function]]` | `(next: T): void`      | Invoke the next value to be emitted |
| `[[Function]]` | `(...next: T[]): void` | Invoke the next value to be emitted |

## Decorators

### `@Computed<T>`

Calculates computed properties with the provided function. Transforms the target property
into a readonly getter. Use memoized functions for extra performance.

#### Usage

```typescript
export interface MyState {
    firstName: string
    lastName: string
}

// this example is not memoized
export const $fullName = () => (state: MyState) => state.firstName + " " + state.lastName

@Component()
export class MyComponent implements MyState {
    @Computed<string>($fullName)
    readonly fullName: string
}
```

Use factory functions when creating memoized selectors so that each
instance of the class gets its own cache. For example:

```typescript
// This example uses createSelector from @ngrx/store
const $myState = (state: MyState) => state
const $fullName = createSelector(
    $myState,
    state => state.firstName + " " + state.lastName,
)
// Don't do this!
const $selectFullName = () => $fullName
// Wrap call to createSelector inside factory
const $selectFullName = () =>
    createSelector(
        $myState,
        state => state.firstName + " " + state.lastName,
    )
```

#### API

| Arguments                                  | Description                                         |
| :----------------------------------------- | :-------------------------------------------------- |
| `selectorFactory: () => (state: any) => T` | Selector factory that calculates the computed value |

Returns `PropertyDecorator`

### `@NgOnInit`

Decorator hook for `OnInit`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgOnInit()
public runOnInit() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgOnChanges`

Decorator hook for `OnChanges`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgOnChanges()
public runOnChanges() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgDoCheck`

Decorator hook for `DoCheck`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgDoCheck()
public runDoCheck() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgAfterContentInit`

Decorator hook for `AfterContentInit`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgAfterContentChecked()
public runAfterContentInit() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgAfterContentChecked`

Decorator hook for `AfterContentChecked`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgAfterContentChecked()
public runAfterContentChecked() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgAfterViewInit`

Decorator hook for `AfterViewInit`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgAfterViewInit()
public runAfterViewInit() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgAfterViewChecked`

Decorator hook for `AfterViewChecked`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgAfterViewChecked()
public runAfterViewChecked() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

### `@NgOnDestroy`

Decorator hook for `OnDestroy`. Requires a component or directive that extends `NgObservable<T>`.

#### Usage

```typescript
@NgOnDestroy()
public runOnDestroy() {
    // Implementation details
}
```

#### API

Returns `MethodDecorator`

## Operators

### `ngOnChanges`

Only emit changes from `ON_CHANGES` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngOnChanges(this).subscribe(changes => console.log(changes))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<TypedChanges<T>>`

### `ngOnInit`

Only emit changes from `ON_INIT` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngOnInit(this).subscribe(() => console.log("ngOnInit fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngDoCheck`

Only emit changes from `DO_CHECK` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngDoCheck(this).subscribe(() => console.log("ngDoCheck fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngAfterContentInit`

Only emit changes from `AFTER_CONTENT_INIT` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterContentInit(this).subscribe(() => console.log("ngAfterContentInit fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngAfterContentChecked`

Only emit changes from `AFTER_CONTENT_CHECKED` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterContentChecked(this).subscribe(() => console.log("ngAfterContentChecked fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngAfterViewInit`

Only emit changes from `AFTER_VIEW_INIT` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterViewInit(this).subscribe(() => console.log("ngAfterViewInit fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngAfterViewChecked`

Only emit changes from `AFTER_VIEW_CHECKED` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterViewChecked(this).subscribe(() => console.log("ngAfterViewChecked fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `ngOnDestroy`

Only emit changes from `ON_DESTROY` event. Use with components or directives that extend `NgObservable<T>`.

#### Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngOnDestroy(this).subscribe(() => console.log("ngOnDestroy fired!"))
    }
}
```

#### API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`

### `select<T, U>`

Derive state from upstream observable and emit when the derived state changes. Recommended for use with `State<T>`.
Provided for convenience if other select methods aren't available.

> If you're using this to derive properties from a component or directive, consider using `@Computed<T>`
> properties

#### Usage

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

#### API

```typescript
select<T, U>(selector: (state: T) => U): OperatorFunction<T, U>
select<T, U>(state: Observable<T>, selector: (state: T) => U): Observable<U>
```

### `stream<T>`

Alternative form of `subscribe()` for Observables. Connects an observer with the upstream observable and emits the
teardown logic. Use with `StreamSink` for a more concise stream/sink syntax.

#### Usage

```typescript
const streamSink = new StreamSink()
const count = new BehaviourSubject<number>(0)

streamSink.sink = interval(1000).pipe(
    map(count => count * 2),
    stream(count), // must always be the last operator
)

// alternative form if only there's only one argument
streamSink.sink = stream(count)(interval(1000))
```

#### API

| Arguments                             | Description                                 |
| :------------------------------------ | :------------------------------------------ |
| `partialObserver: PartialObserver<T>` | Accepts the same arguments as `subscribe()` |

Returns `(source: Observable<T>) => Observable<TeardownLogic>`

## Interfaces

### `NgHooksEvent<T>`

```typescript
type NgHooksEvent<T extends any = any> = [NgHooksEventType, TypedChanges<T>] | [NgHooksEventType]
```

### `TypedChanges<T>`

```typescript
type TypedChanges<T> = { [key in keyof T]: TypedChange<T[key]> }
```

### `TypedChange<T>`

```typescript
interface TypedChange<T> {
    previousValue: T
    currentValue: T
    firstChange: boolean
    isFirstChange(): boolean
}
```

### `Sinkable`

Interface describing an object that can be assigned to a sink in `StreamSink`

```typescript
type Sinkable = TeardownLogic | Observable<TeardownLogic>
```

## Utils

### `unsubscribe`

Unsubscribe immediately from all unsubscribables passed to it. Also completes any subjects.

#### Usage

```typescript
const sub1 = new Subscription()
const sub2 = new Subject()
const sub3 = new BehaviorSubject()

unsubscribe(sub1, sub2, sub3)
```

## Providers

### `useDefaultLifecycleHooks`

Provides the default lifecycle flags to be used by `NgObservable<T>`. Lifecycle events will only be emitted for
the flags that are provided by this token unless overwritten at the component or directive level.

#### Usage

```typescript
// Only provide this token once in the root injector.
@NgModule({
    providers: [
        // provide flags
        useDefaultLifecycleHooks(ON_INIT, ON_CHANGES, DO_CHECK, ON_DESTROY),
    ],
})
export class MyAppModule {}
```

## Constants

### `NgHooksEventType`

Enumerated lifecycle flags used to filter event streams from `NgObservable<T>`

### `ON_CHANGES`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `ON_INIT`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `DO_CHECK`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `AFTER_CONTENT_INIT`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `AFTER_CONTENT_CHECKED`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `AFTER_VIEW_INIT`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `AFTER_VIEW_CHECKED`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `ON_DESTROY`

Lifecycle flag used by `NgObservable<T>` to determine if events for this hook should be fired.

### `LIFECYCLE_FLAGS`

Injection token to configure the default lifecycle events emitted by `NgObservable<T>`
