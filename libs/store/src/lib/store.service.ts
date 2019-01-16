import { Inject, Injectable, OnDestroy, Optional, SkipSelf, Type } from "@angular/core"
import { asapScheduler, BehaviorSubject, Observable, Subject } from "rxjs"
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    mapTo,
    skip,
    startWith,
    tap,
} from "rxjs/operators"
import { produce } from "immer"
import { STORE_ACTIONS, STORE_FEATURE, STORE_INITIAL_STATE } from "./constants"
import { Action, Feature, StateSetter, StoreLike } from "./interfaces"
import { defaultMemoize, Selector } from "reselect"
import { isRecipe } from "./operators"
import { select } from "./operators"

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

    constructor(
        @Inject(STORE_FEATURE) feature: Feature,
        @Inject(STORE_INITIAL_STATE) initialState: any,
        @Inject(STORE_ACTIONS) actions: Subject<any>,
        @Optional() @SkipSelf() parent?: Store<any>,
    ) {
        super(subscriber => {
            this.state$
                .pipe(
                    skip(1),
                    debounceTime(0, asapScheduler),
                    distinctUntilChanged(),
                    mapTo(this),
                    startWith(this),
                )
                .subscribe(subscriber)
        })

        this.feature = feature
        this.parent = parent
        this.state$ = new BehaviorSubject(initialState)
        this.destroyed$ = new Subject()
        this.actions$ = actions

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

    public ofAction<U extends any>(actionType: Type<U>): Observable<U> {
        if (actionType.hasOwnProperty("type")) {
            return this.actions$.pipe(
                filter<U>(action => action.type === (actionType as any).type),
            )
        } else {
            console.error(
                `Action missing static property "type". Did you forget the @OfType() decorator?`,
                actionType,
            )
            throw new Error()
        }
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
