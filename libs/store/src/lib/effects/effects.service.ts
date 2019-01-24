import { ConnectFactoryWithContext, ConnectFnWithContext } from "../interfaces"
import { Inject, Injectable, Injector, Optional, Type } from "@angular/core"
import { STORE_EFFECTS, STORE_EFFECTS_OBSERVER } from "../constants"
import { Observable, Subject } from "rxjs"
import { map, tap } from "rxjs/operators"

export const connections = Symbol("connections")

export interface EffectsProvider extends Type<any> {
    connect: ConnectFactoryWithContext<any, any>
}

export interface Effect<T, U> {
    source: ConnectFnWithContext<T, U>
    value: Observable<U>
}

export function createConnector<T>(): <U extends ConnectFnWithContext<T, V>, V>(connectFn: U) => U {
    function connect(connectFn) {
        connect[connections].add(connectFn)
        return connectFn
    }

    Object.defineProperty(connect, connections, {
        value: new Set(),
    })

    return connect
}

@Injectable()
export class EffectsService extends Observable<Effect<any, any>> {
    private readonly effects: EffectsProvider[]
    private readonly injector: Injector
    private effects$: Subject<any>

    constructor(
        injector: Injector,
        @Inject(STORE_EFFECTS_OBSERVER) observer: Subject<Effect<any, any>>,
        @Inject(STORE_EFFECTS) effects: EffectsProvider[],
    ) {
        super(subscriber => this.effects$.subscribe(subscriber))

        this.effects$ = observer
        this.effects = effects
        this.injector = injector
    }

    runEffects() {
        const { effects, injector } = this

        effects.forEach(effect => {
            const connectFns: ConnectFnWithContext<any, any>[] = effect.connect[connections]

            if (connectFns) {
                const context = injector.get(effect)
                connectFns.forEach(connectFn => {
                    connectFn(context)
                        .pipe(
                            map(value => ({
                                source: connectFn,
                                value,
                            })),
                        )
                        .subscribe(this.effects$)
                })
            }
        })
    }
}

@Injectable()
export class Effects extends Observable<Effect<any, any>> {
    constructor(@Inject(STORE_EFFECTS) effects: Observable<Effect<any, any>>) {
        super(subscriber => effects.subscribe(subscriber))
    }
}
