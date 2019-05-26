# `StreamSink`

A convenience object for cleaning up multiple streams when they are no longer needed.

## Usage

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
        this.stream = new StreamSink()
        this.stream.sink = stream(noop)(interval(1000))
    }

    ngOnDestroy() {
        // Unsubscribe all streams attached
        this.stream.complete()
    }
}
```

## API

| Property      | Type                                | Description                              |
| :------------ | :---------------------------------- | :--------------------------------------- |
| `sinkAll`     | `(...sinkables: Sinkables[]): void` | Sink all streams passed to it.           |
| `sink`        | `Sinkable`                          | Sink a stream through object assignment. |
| `close`       | `(): void`                          | Close and dispose of all streams.        |
| `ngOnDestroy` | `(): void`                          | OnDestroy lifecycle hook                 |
