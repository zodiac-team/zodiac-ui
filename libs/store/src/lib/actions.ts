import { Subject } from "rxjs"
import { Action } from "./interfaces"

export class Actions extends Subject<Action> {}
