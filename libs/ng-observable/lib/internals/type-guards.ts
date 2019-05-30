import { CompletionObserver, Unsubscribable } from "rxjs"

export function isCompletionObserver(obj: any): obj is CompletionObserver<any> {
    return typeof obj && typeof obj["complete"] === "function"
}

export function isUnsubscribable(obj: any): obj is Unsubscribable {
    return typeof obj && typeof obj["unsubscribe"] === "function"
}
