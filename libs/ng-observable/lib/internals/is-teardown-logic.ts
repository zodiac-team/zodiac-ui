import { TeardownLogic } from "rxjs"

export function isTeardownLogic(teardown: any): teardown is TeardownLogic {
    return (
        teardown === null ||
        typeof teardown === "undefined" ||
        (typeof teardown === "function" || typeof teardown["unsubscribe"] === "function")
    )
}
