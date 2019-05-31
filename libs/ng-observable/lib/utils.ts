import { Unsubscribable, CompletionObserver } from "rxjs"
import { isCompletionObserver, isUnsubscribable } from "./internals/type-guards"

/**
 * Convenience function for cleaning up multiple subscriptions.
 *
 * @param unsubscribables A series of subscriptions or completable subjects to unsubscribe from.
 */
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
