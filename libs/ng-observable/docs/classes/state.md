# `State<T>`

Centralised state management service for Angular components and directives. To be used with `ChangeDetectionStrategy.OnPush`.

## Usage

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

**Mapping @Input\(\) props to State&lt;T&gt;**

> This step is optional if you don't need to subscribe to `@Input()` changes.

To keep the state in sync with `@Input()` props it is necessary to notify the `State<T>` when changes are made. Here's a couple of options:

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

> Note: `mapPropsToState` assumes that `MyState` extends `MyProps`. If you would rather map props to state differently, consider using the `ngOnChanges` operator.

## API

Inherits from `BehaviorSubject<T>`

| Property        | Type                       | Description                                        |
| :-------------- | :------------------------- | :------------------------------------------------- |
| `value`         | `readonly T`               | The current value of the state                     |
| `next()`        | `(partialState?: T): void` | Update the state and queue a change detection run. |
| `unsubscribe()` | `(): void`                 | Close the state and unsubscribe from notifiers.    |
| `ngOnDestroy`   | `(): void`                 | OnDestroy lifecycle hook                           |
