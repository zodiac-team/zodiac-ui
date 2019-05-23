import { Unsubscribable, CompletionObserver } from "rxjs"
import { isCompletionObserver, isUnsubscribable } from "./internals/type-guards"

export function unsubscribe(...unsubscribables: (CompletionObserver<any> | Unsubscribable)[]) {
    for (const subscriber of unsubscribables) {
        if (isCompletionObserver(subscriber)) {
            subscriber.complete()
        }
        if (isUnsubscribable(subscriber)) {
            subscriber.unsubscribe()
        }
    }
}
