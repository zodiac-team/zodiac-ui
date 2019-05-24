import { CompletionObserver, TeardownLogic, Unsubscribable } from "rxjs"

export function isCompletionObserver(obj: any): obj is CompletionObserver<any> {
    return typeof obj && typeof obj["complete"] === "function"
}

export function isUnsubscribable(obj: any): obj is Unsubscribable {
    return typeof obj && typeof obj["unsubscribe"] === "function"
}

export function isTeardownLogic(teardown: any): teardown is TeardownLogic {
    return (
        teardown === null ||
        typeof teardown === "undefined" ||
        (typeof teardown === "function" || typeof teardown["unsubscribe"] === "function")
    )
}
