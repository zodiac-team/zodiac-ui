import { Inject, Injectable, OnDestroy, Optional, SkipSelf } from "@angular/core"
import { asapScheduler, BehaviorSubject, Observable, Subject } from "rxjs"
import { debounceTime, distinctUntilChanged, mapTo } from "rxjs/operators"
import { produce } from "immer"
import { STORE_ACTIONS, STORE_FEATURE, STORE_INITIAL_STATE } from "./constants"
import {
    Action,
    Computed,
    Feature,
    InitialState,
    InitialStateGetter,
    StateSetter,
    StoreLike,
} from "./interfaces"
import { defaultMemoize, Selector } from "reselect"
import { compute, isRecipe, select } from "./operators"

export function createFeatureSelector<T>(): (state: T) => T {
    return defaultMemoize(state => state)
}

@Injectable()
export class Store<T> extends Observable<Store<T>> implements StoreLike<T>, OnDestroy {
    private readonly feature: Feature
    private readonly state$: BehaviorSubject<T>
    private readonly destroyed$: Subject<void>
    private readonly actions$: Subject<Action>
    private readonly parent: Store<any>
    private readonly computed: Computed<T>

    constructor(
        @Inject(STORE_FEATURE) feature: Feature,
        @Inject(STORE_INITIAL_STATE) getInitialState: InitialStateGetter<T>,
        @Inject(STORE_ACTIONS) actions: Subject<any>,
        @Optional() @SkipSelf() parent?: Store<any>,
    ) {
        let sub: Observable<Store<T>>

        super(subscriber => sub.subscribe(subscriber))

        const stateConfig = getInitialState()
        const initialState: T = {} as T
        const computed: any = {}

        for (const key in stateConfig) {
            if (stateConfig.hasOwnProperty(key)) {
                const value = stateConfig[key]
                if (typeof value === "function") {
                    computed[key] = value
                    initialState[key] = null
                } else {
                    initialState[key] = value as any
                }
            }
        }

        this.computed = computed
        this.feature = feature
        this.parent = parent
        this.state$ = new BehaviorSubject(initialState)
        this.destroyed$ = new Subject()
        this.actions$ = actions

        sub = this.state$.pipe(
            distinctUntilChanged(),
            debounceTime(0, asapScheduler),
            mapTo(this),
        )

        this.pipe(compute(this.computed)).subscribe()

        if (this.parent) {
            this.parent.state$
                .pipe(select(state => state[this.feature.name]))
                .subscribe(this.state$)
        }
    }

    public get state(): T {
        return this.state$.getValue()
    }

    public ngOnDestroy() {
        this.state$.complete()
        this.destroyed$.complete()
    }

    public select<R>(selector: Selector<T, R>) {
        return this.pipe(select(selector))
    }

    public dispatch(action: any) {
        this.actions$.next(action)
    }

    public setState(setter: StateSetter<T>) {
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
