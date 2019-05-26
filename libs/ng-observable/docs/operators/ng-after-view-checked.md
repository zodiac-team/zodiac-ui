# `ngAfterViewChecked`

Only emit changes from `AFTER_VIEW_CHECKED` event. Use with components or directives that extend `NgObservable<T>`.

## Usage

```typescript
@Component()
export class MyComponent extends NgObservable<T> {
    constructor() {
        ngAfterViewChecked(this).subscribe(() => console.log("ngAfterViewChecked fired!"))
    }
}
```

## API

| Arguments                             | Description                                          |
| :------------------------------------ | :--------------------------------------------------- |
| `source: Observable<NgHooksEvent<T>>` | The upstream observable emitted by `NgObservable<T>` |

Returns `Observable<void>`
