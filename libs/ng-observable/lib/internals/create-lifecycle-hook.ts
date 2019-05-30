import { filter, take } from "rxjs/operators"
import { isObservable } from "rxjs"

export function createLifecycleHook<U extends { [key in V]: any }, V extends string>(
    source: U,
    name: V,
    once?: boolean,
    pipes = [filter(inst => inst === source)],
) {
    const hook: any = source[name]

    if (once) {
        pipes.push(take(1))
    }

    if (isObservable(hook)) {
        return (<any>hook).pipe(...pipes)
    } else {
        console.error(`${name} is not an observable! Error context: `, source)
        throw new Error()
    }
}
