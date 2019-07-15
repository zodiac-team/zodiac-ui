import { Inject, Injectable, Injector } from "@angular/core"
import { from, merge, Subject } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { Effect, EffectsProvider } from "./interfaces"
import { EFFECTS } from "./constants"

@Injectable()
export class Effects extends Subject<Effect> {}

@Injectable()
export class StoreEffects {
    constructor(@Inject(EFFECTS) private providers: EffectsProvider[], private injector: Injector, private effectsObserver: Effects) {}

    public run() {
        const { providers, injector, effectsObserver } = this
        providers.forEach((provider) => {
            const context = provider.config ? injector.get(provider.config.context, undefined) : undefined
            const effects = provider.effects.map((type) => from(type(context)).pipe(
                map((payload) => ({
                    type,
                    payload
                }))
            ))

            merge(...effects).pipe(
                catchError((error, caught) => {
                    console.error(error)
                    return caught
                })
            ).subscribe((effect) => effectsObserver.next(effect))
        })
    }
}
