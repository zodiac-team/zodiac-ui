import { Observable, OperatorFunction } from "rxjs"
import { filter, map } from "rxjs/operators"
import { Effect, EffectFactory } from "./interfaces"

export function ofEffect<T extends EffectFactory>(effectFactory: T): OperatorFunction<Effect, ReturnType<T> extends Observable<infer R> ? R : never> {
    return function (source) {
        return source.pipe(
            filter((effect) => effect.type === effectFactory),
            map((effect) => effect.payload)
        )
    }
}
