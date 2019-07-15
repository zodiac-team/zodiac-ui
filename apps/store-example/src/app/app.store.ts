import { action, Action, Actions, Effects, ofAction, ofEffect, select, setState, Store } from "@zodiac-ui/store"
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { delay, filter, skip, switchMap, take, tap } from "rxjs/operators"
import { asapScheduler, queueScheduler, timer } from "rxjs"
import { createSelector } from "reselect"

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
}

const feature = (state: AppState) => state
const $count = createSelector(
    feature,
    state => state.count,
)

// export const $computedValue = createSelector(
//     $count,
//     count => {
//         return count + 1
//     },
// )
//
// export const $chainedValue = createSelector(
//     $computedValue,
//     computedValue => {
//         return computedValue * 5
//     },
// )

export const initialState: AppState = {
    count: 0,
    didIncrement: false,
    somethingElse: null,
    todo: null,
    isLoaded: false,
}

// export const connect = createConnector<AppEffects>()

// @OfType("GET_TODOS")
// export class GetTodos {
//     constructor(public payload: any) {}
// }
//
@Injectable()
export class AppEffectsContext {
    constructor(
        public http: HttpClient,
        public store: Store<AppState>,
        public actions: Actions,
        public effects: Effects,
    ) {}
}
//
function didIncrement({ store }: AppEffectsContext) {
    return (<any>store).state.pipe(
        select($count),
        filter(count => count === 1),
        setState(store, state => {
            state.didIncrement = true
        }),
    )
}

function somethingElse({ store }: AppEffectsContext) {
    return timer(1000).pipe(setState(store, { somethingElse: "somethingElse" }))
}

function someEffect({ http, store, actions }: AppEffectsContext) {
    return actions.pipe(
        ofAction(someAction),
        switchMap(action => {
            return http.get<Todo>(action.payload).pipe(
                setState(store, (state, todo) => ({
                    todo,
                })),
            )
        }),
    )
}

function isLoaded({ store, effects }: AppEffectsContext) {
    return effects.pipe(
        ofEffect(someEffect),
        setState(store, (state, ctx) => ({
            isLoaded: true,
        })),
    )
}

export const appEffects = [didIncrement, somethingElse, someEffect, isLoaded]

type SomeAction = Action<{
    type: "SOME_ACTION",
    payload: string
}>

const someAction = action<SomeAction>("SOME_ACTION")
