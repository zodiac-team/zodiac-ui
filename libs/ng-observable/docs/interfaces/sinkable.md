# `Sinkable`

Interface describing an object that can be assigned to a sink in `StreamSink`

```typescript
type Sinkable = TeardownLogic | Observable<TeardownLogic>
```
