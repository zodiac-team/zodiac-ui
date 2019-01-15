import { Inject, Injectable, OnDestroy, Optional, SkipSelf, Type } from "@angular/core"
import {
    asapScheduler,
    asyncScheduler,
    BehaviorSubject,
    Observable,
    OperatorFunction,
    Subject,
    Subscriber,
} from "rxjs"
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    skip,
    switchMap,
    tap,
} from "rxjs/operators"
import { produce } from "immer"
import { STORE_FEATURE, STORE_INITIAL_STATE } from "./constants"
import { Action, ActionType, Feature } from "./interfaces"

export function TypeOf<T extends { new (...args: any[]): {} }>(type: string) {
    return function(constructor) {
        return class extends constructor {
            static type = type
            type = type
            constructor(...args: any[]) {
                super(...args)
            }
        } as typeof constructor
    }
}

const actions$$ = new Subject<Action>()
export const actions$ = actions$$.asObservable()

export function setState<T>(store: T): any
export function setState<T, U>(
    setter: (ctxOrStore: U | Store<T>, store: Store<T>) => U,
): OperatorFunction<[U, Store<T>], any> {
    return function(source$: Observable<[U, Store<T>]>) {
        return source$.pipe(
            tap(([source, store]) => {
                store.setState(setter.bind(null, source))
            }),
            map(([source]) => source),
        )
    }
}

export type WithStoreReturnFn<T> = (source$: Observable<T>) => Observable<T>
export type WithStoreFn<T, U> = (...ops: OperatorFunction<T, T>[]) => Observable<T>

export function withStore<T, U>(store: Store<T>): WithStoreFn<T, U> {
    return function(...ops) {
        return (function(source$) {
            return source$
        })()
    }
}

export function select<T>(key): any {
    return function(source$: Observable<T>) {
        return source$.pipe(
            map(state => state[key]),
            distinctUntilChanged(),
        )
    }
}

export function watch<T>(key?): any {
    return function(source$: Observable<T>) {
        return source$.pipe(
            map(state => (key ? state[key] : state)),
            distinctUntilChanged(),
            skip(1),
        )
    }
}

export function isRecipe<T>(setter): setter is (draft: T) => any {
    return typeof setter === "function"
}

export function ofAction<T extends Action>(
    action: ActionType<T>,
): (source$: Observable<Store<any>>) => Observable<Action> {
    return function(source$) {
        return source$.pipe(switchMap(store => store.ofAction(action)))
    }
}

@Injectable()
export class Store<T> extends Observable<T> implements OnDestroy {
    private readonly feature: Feature
    private readonly state$: BehaviorSubject<T>
    private readonly destroyed$: Subject<void>
    private readonly actions$: Subject<Action>
    private readonly parent: Store<any>

    constructor(
        @Inject(STORE_FEATURE) feature: Feature,
        @Inject(STORE_INITIAL_STATE) initialState: any,
        @Optional() @SkipSelf() parent?: Store<any>,
    ) {
        super((subscriber: Subscriber<T>) => {
            this.state$
                .pipe(
                    debounceTime(0, asapScheduler),
                    distinctUntilChanged((x, y) => {
                        return y === x
                    }),
                )
                .subscribe(subscriber)
        })

        this.feature = feature
        this.parent = parent
        this.state$ = new BehaviorSubject(initialState)
        this.destroyed$ = new Subject()
        this.actions$ = actions$$

        if (this.parent) {
            this.setState(draft => draft)

            this.parent.state$.pipe(select(this.feature.name)).subscribe(this.state$)

            this.parent.actions$.subscribe(this.actions$)
        }
    }

    public get state(): T {
        return this.state$.getValue()
    }

    public ngOnDestroy() {
        this.state$.complete()
        this.destroyed$.complete()
    }

    public select(selector) {
        return this.pipe(select(selector))
    }

    public dispatch(action: any) {
        if (this.parent) {
            this.parent.dispatch(action)
        } else {
            this.actions$.next(action)
        }
    }

    public ofAction<U extends any>(actionType: Type<U>): Observable<U> {
        if (actionType.hasOwnProperty("type")) {
            return this.actions$.pipe(filter<U>(action => action.type === (actionType as any).type))
        } else {
            console.error(
                `Action missing static property "type". Did you forget the @TypeOf() decorator?`,
                actionType,
            )
            throw new Error()
        }
    }

    public setState(setter: Partial<T> | ((draft: T) => any)) {
        let state: T

        if (isRecipe<T>(setter)) {
            state = produce(this.state, setter)
        } else {
            state = produce(this.state, (draft: T) => Object.assign(draft, setter))
        }

        if (this.parent) {
            this.parent.setState(draft => {
                draft[this.feature.name] = state
            })
        } else {
            this.state$.next(state)
        }
    }
}

export function provideStore(feature: string, initialState: any) {
    return [
        {
            provide: Store,
            useClass: Store,
        },
        {
            provide: STORE_FEATURE,
            useValue: {
                name: feature,
            },
        },
        {
            provide: STORE_INITIAL_STATE,
            useValue: initialState,
        },
    ]
}
