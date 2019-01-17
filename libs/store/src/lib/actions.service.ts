import { Inject, Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { STORE_ACTIONS } from "./constants"

@Injectable()
export class Actions extends Observable<any> {
    constructor(@Inject(STORE_ACTIONS) actions: Subject<any>) {
        super(subscriber => actions.subscribe(subscriber))
    }
}
