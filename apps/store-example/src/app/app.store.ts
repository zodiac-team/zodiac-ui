import {
    createConnector,
    createFeatureSelector,
    Effects,
    InitialState,
    ofAction,
    ofEffect,
    OfType,
    select,
    setState,
    Store,
} from "@zodiac-ui/store"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { filter, skip, switchMap, take, tap } from "rxjs/operators"
import { timer } from "rxjs"
import { createSelector } from "reselect"
import { Actions } from "@zodiac-ui/store"

interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
}

export interface AppState {
    count: number
    didIncrement: boolean
    somethingElse: string
    isLoaded: boolean
    todo: Todo
    computedValue: number
    chainedValue: number
}

const feature = createFeatureSelector<AppState>()
const $count = createSelector(
    feature,
    state => state.count,
)

export const $computedValue = createSelector(
    $count,
    count => {
        return count + 1
    },
)

export const $chainedValue = createSelector(
    $computedValue,
    computedValue => {
        return computedValue * 5
    },
)

export function initialState(): InitialState<AppState> {
    return {
        count: 0,
        didIncrement: false,
        somethingElse: null,
        todo: null,
        isLoaded: false,
        computedValue: $computedValue,
        chainedValue: $chainedValue,
    }
}

export const connect = createConnector<AppEffects>()

@OfType("GET_TODOS")
export class GetTodos {
    constructor(public payload: any) {}
}

@Injectable()
export class AppEffects {
    static connect = connect
    constructor(
        public http: HttpClient,
        public store: Store<AppState>,
        public actions: Actions,
        public effects: Effects,
    ) {}
}

connect(({ store }) => {
    return store.pipe(
        select($count),
        skip(1),
        take(1),
        setState(store, (state) => {
            state.didIncrement = true
        }),
    )
})

connect(({ store }) => timer(1000).pipe(setState(store, { somethingElse: "somethingElse" })))

const someEffect = connect(({ http, store, actions }) =>
    actions.pipe(
        ofAction(GetTodos),
        switchMap(action => {
            return http.get<Todo>(action.payload).pipe(
                setState(store, (state, todo) => {
                    state.todo = todo
                }),
            )
        }),
    ),
)

connect(({ store, effects }) =>
    effects.pipe(
        ofEffect(someEffect),
        setState(store, state => {
            state.isLoaded = true
        }),
    ),
)
