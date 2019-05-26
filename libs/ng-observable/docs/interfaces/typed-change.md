# `TypedChange<T>`

```typescript
interface TypedChange<T> {
    previousValue: T
    currentValue: T
    firstChange: boolean
    isFirstChange(): boolean
}
```
