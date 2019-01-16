import {
    compute,
    createConnector,
    createFeatureSelector,
    ofAction,
    OfType,
    setState,
    watch,
} from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { switchMap, tap } from "rxjs/operators"
import { timer } from "rxjs"
import { createSelector } from "reselect"

export interface AppState {
    count: number
    didIncrement: boolean
    somethingElse: string
    todo: any
    computedValue: number
}

export const initialState: AppState = {
    count: 0,
    didIncrement: false,
    somethingElse: null,
    todo: null,
    computedValue: null,
}

@OfType("GET_TODOS")
export class GetTodos {
    constructor(public payload: any) {}
}

@Injectable()
export class AppEffects {
    static connect = createConnector<AppState, AppEffects>()
    constructor(public http: HttpClient) {}
}

const feature = createFeatureSelector<AppState>()
const $count = createSelector(
    feature,
    state => state.count,
)

AppEffects.connect(store =>
    store.pipe(
        watch(state => state.count),
        tap(() => store.setState({ didIncrement: true })),
    ),
)

AppEffects.connect(store => timer(1000).pipe(setState(store, { somethingElse: "somethingElse" })))

AppEffects.connect(
    compute($count, (count, state) => {
        state.computedValue = count + 1
    }),
)

AppEffects.connect((store, ctx) =>
    store.pipe(
        ofAction(GetTodos),
        switchMap(action =>
            ctx.http.get(action.payload).pipe(tap(todo => store.setState({ todo }))),
        ),
    ),
)
