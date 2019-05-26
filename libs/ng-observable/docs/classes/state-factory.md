# `StateFactory<T>`

Injectable class that is optionally bound to a directive's `ChangeDetectorRef` if provided.

## Usage

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

## API

| Property | Type                                                            | Description           |
| :------- | :-------------------------------------------------------------- | :-------------------- |
| `create` | `(value: T, notifier: Observable<Partial<T> or void): State<T>` | Create a state object |
