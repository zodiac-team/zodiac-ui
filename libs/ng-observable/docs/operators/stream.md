# `stream<T>`

Connects an observer with the upstream observable but only forwards `next` values. Uncaught errors are only logged and completions are discarded.
The resulting observable emits the teardown logic for the subscription. Use with `StreamSink` for a more concise stream/sink syntax.

## Usage

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

## API

| Arguments                             | Description                                 |
| :------------------------------------ | :------------------------------------------ |
| `partialObserver: PartialObserver<T>` | Accepts the same arguments as `subscribe()` |

Returns `(source: Observable<T>) => Observable<TeardownLogic>`
