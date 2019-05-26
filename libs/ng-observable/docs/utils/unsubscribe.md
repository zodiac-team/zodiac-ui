# `unsubscribe`

Unsubscribe immediately from all unsubscribables passed to it. Also completes any subjects.

## Usage

```typescript
const sub1 = new Subscription()
const sub2 = new Subject()
const sub3 = new BehaviorSubject()

unsubscribe(sub1, sub2, sub3)
```
