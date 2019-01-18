import { Inject, Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { STORE_ACTIONS_OBSERVER } from "./constants"

@Injectable()
export class Actions extends Observable<any> {
    constructor(@Inject(STORE_ACTIONS_OBSERVER) actions: Subject<any>) {
        super(subscriber => actions.subscribe(subscriber))
    }
}
