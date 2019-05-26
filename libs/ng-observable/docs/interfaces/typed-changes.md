# `TypedChanges<T>`

```typescript
type TypedChanges<T> = { [key in keyof T]: TypedChange<T[key]> }
```
