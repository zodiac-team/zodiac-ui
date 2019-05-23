import { Observable, OperatorFunction } from "rxjs"
import { distinctUntilChanged, map } from "rxjs/operators"

export function select<T, U>(selector: (state: T) => U): OperatorFunction<T, U>
export function select<T, U>(state: Observable<T>, selector: (state: T) => U): Observable<U>
export function select<T, U>(...args: any[]): unknown {
    const selector = args[args.length - 1]
    function pipeState(source: Observable<T>) {
        return source.pipe(
            map(selector),
            distinctUntilChanged(),
        )
    }

    return args.length > 1 ? pipeState(args[0]) : pipeState
}
