# `ngOnDestroy`

Only emit changes from `ON_DESTROY` event. Use with components or directives that extend `NgObservable<T>`.

## Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngOnDestroy(this).subscribe(() => console.log("ngOnDestroy fired!"))
    }
}
```

## API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`
