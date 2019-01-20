import { Inject, Injectable } from "@angular/core"
import { STORE_DEVTOOLS_EXTENSION } from "./constants"
import { Actions } from "../actions.service"
import { SetState, Store } from "../store.service"
import { buffer, delay, map, skip } from "rxjs/operators"
import { ofAction } from "../operators"
import { asapScheduler, Observable } from "rxjs"
import { Action } from "../interfaces"

const id = 0

@Injectable()
export class StoreDevtoolsService {
    public actions$: Observable<Action>
    public store$: Store<any>
    public extension: any

    constructor(
        @Inject(STORE_DEVTOOLS_EXTENSION) extension: any,
        actions$: Actions,
        store$: Store<any>,
    ) {
        this.actions$ = actions$
        this.store$ = store$
        this.extension = extension
    }

    public run() {
        const { extension, store$, actions$ } = this
        let lastDate = new Date()

        if (extension) {
            extension.subscribe(message => {
                if (message.type === "ACTION") {
                    let action
                    try {
                        console.log(message)
                        action = JSON.parse(message.payload.replace(/\n/, " "))
                    } catch (e) {
                        console.warn("Invalid JSON received from dispatcher.", e)
                    }

                    if (action) {
                        if (action.setState) {
                            store$.setState(action.setState)
                        } else {
                            store$.dispatch(action)
                        }
                    }
                }
                if (message.type === "DISPATCH") {
                    const state = JSON.parse(message.state)
                    store$.setState(state)
                }
            })

            actions$.subscribe(action => {
                if (action.type !== "SET_STATE") {
                    extension.send(action, store$.state)
                }
            })

            actions$
                .pipe(
                    skip(1),
                    ofAction(SetState),
                    map(action => action.payload),
                    buffer(store$),
                    delay(0, asapScheduler),
                )
                .subscribe(changes => {
                    const date = new Date()

                    extension.send(
                        {
                            type: "SET_STATE",
                            callCount: changes.length,
                        },
                        store$.state,
                    )
                    lastDate = date
                })
        }
    }
}
