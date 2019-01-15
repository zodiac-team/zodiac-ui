import { TypeOf, createConnector, select, watch } from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { delay, switchMap, tap } from "rxjs/operators"
import { timer } from "rxjs"

export interface AppState {
    count: number
    didIncrement: boolean
    somethingElse: string
    todo: any
}

export const initialState: AppState = {
    count: 0,
    didIncrement: false,
    somethingElse: null,
    todo: null,
}

@TypeOf("GET_TODOS")
export class GetTodos {
    constructor(public payload: any) {}
}

@Injectable()
export class AppEffects {
    static connect = createConnector<AppState, AppEffects>()
    constructor(public http: HttpClient) {}
}

export enum app {
    DID_INCREMENT = "Did increment",
    SOMETHING_ELSE = "Something else",
    GET_TODO = "Get todo",
}

AppEffects.connect(
    store =>
        store.pipe(
            watch("count"),
            tap(() => store.setState({ didIncrement: true })),
        ),
    app.DID_INCREMENT,
)

AppEffects.connect(
    store =>
        timer(1000).pipe(
            tap(() =>
                store.setState(draft => Object.assign(draft, { somethingElse: "somethingElse" })),
            ),
        ),
    app.SOMETHING_ELSE,
)

AppEffects.connect(
    (store, ctx) =>
        store
            .ofAction(GetTodos)
            .pipe(
                switchMap(action =>
                    ctx.http
                        .get(action.payload)
                        .pipe(tap(todo => store.setState({ todo }))),
                ),
            ),
    app.GET_TODO,
)
