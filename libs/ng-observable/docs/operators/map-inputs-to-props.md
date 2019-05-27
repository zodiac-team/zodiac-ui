# `mapInputsToProps`

Event emitter wrapping `ngOnChanges` that is used to notify the `State` object of input changes.

## Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor(@Self() stateFactory: StateFactory<MyState>) {
        const state = stateFactory.create(this)
    
        this.sink = stream(state)(mapInputsToState(this))
    }
}
```

## API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<T>`
