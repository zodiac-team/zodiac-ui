# `ngAfterViewInit`

Only emit changes from `AFTER_VIEW_INIT` event. Use with components or directives that extend `NgObservable<T>`.

## Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterViewInit(this).subscribe(() => console.log("ngAfterViewInit fired!"))
    }
}
```

## API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`
