# `ngAfterContentInit`

Only emit changes from `AFTER_CONTENT_INIT` event. Use with components or directives that extend `NgObservable<T>`.

## Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterContentInit(this).subscribe(() => console.log("ngAfterContentInit fired!"))
    }
}
```

## API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`
