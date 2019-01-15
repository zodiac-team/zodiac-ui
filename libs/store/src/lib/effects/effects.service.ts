import { Action, ConnectFactoryWithContext, ConnectFnWithContext } from "../interfaces"
import { Inject, Injectable, Injector, Optional, Type } from "@angular/core"
import { Store } from "../store.service"
import { STORE_EFFECTS } from "../constants"
import { asapScheduler, defer, Observable, Subject } from "rxjs"
import { debounceTime, share, skip, throttleTime } from "rxjs/operators"

const connections = Symbol("connections")

export interface Effects extends Type<any> {
    connect: ConnectFactoryWithContext<any, any>
}

export function createConnector<T, U>(): ConnectFactoryWithContext<T, U> {
    function connect(connectFn: ConnectFnWithContext<T, U>, name: string) {
        connect[connections].set(name, connectFn)
        return connectFn
    }

    Object.defineProperty(connect, connections, {
        value: new Map(),
    })

    return connect
}

@Injectable()
export class EffectsService {
    private readonly effects: Effects[]
    private readonly store: Store<any>
    private readonly injector: Injector

    constructor(
        injector: Injector,
        store: Store<any>,
        @Optional() @Inject(STORE_EFFECTS) effects?: Effects[],
    ) {
        this.effects = effects
        this.store = store
        this.injector = injector
    }

    runEffects() {
        const { effects, store, injector } = this

        effects.forEach(effect => {
            const connectFns = effect.connect[connections]

            if (connectFns) {
                const context = injector.get(effect)
                connectFns.forEach(connectFn => {
                    connectFn(store, context).subscribe()
                })
            }
        })
    }
}
