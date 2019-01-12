import { ChangeDetectorRef, Injectable, OnDestroy, Optional } from "@angular/core"
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs"
import { distinctUntilChanged, map } from "rxjs/operators"

export interface Feature {
    name: string
    path: any
}

export function setState<T>(state: T, propertyOrSetter, setter): T {
    return // Not implemented
}

export function sliceState(state, path) {
    return // Not implemented
}

export function select<T>(path) {
    return function(source$: Observable<T>) {
        return source$.pipe(
            map((state) => sliceState(state, path)),
            distinctUntilChanged()
        )
    }
}

@Injectable()
export class Store<T> extends Observable<T> implements OnDestroy {

    public get state(): T {
        return this.state$.getValue()
    }

    private readonly cdr: ChangeDetectorRef
    private readonly feature: Feature
    private readonly state$: BehaviorSubject<T>
    private readonly destroyed$: Subject<void>

    private readonly parent: Store<any>

    constructor(feature: Feature, initialState: T, cdr: ChangeDetectorRef, @Optional() parent: Store<any>) {
        super((subscriber: Subscriber<T>) => {
            this.state$.subscribe(subscriber)
        })

        this.cdr = cdr
        this.state$ = new BehaviorSubject(initialState)
        this.parent = parent
    }

    public ngOnDestroy() {
        this.state$.complete()
        this.destroyed$.complete()
    }

    public select(path) {
        return this.state$.pipe(
            select(path)
        )
    }

    public setState(pathOrSetter, setter?) {
        const state = setState(this.state, pathOrSetter, setter)

        this.state$.next(state)

        if (this.parent) {
            this.parent.setState(this.feature.path, state)
        }
    }
}
