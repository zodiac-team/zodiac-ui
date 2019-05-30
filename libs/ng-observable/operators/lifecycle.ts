import { Observable } from "rxjs"
import { TypedChanges } from "../lib/interfaces"
import { createLifecycleHook } from "../lib/internals/create-lifecycle-hook"
import { filter, map } from "rxjs/operators"

export function ngOnChanges<T, U extends { ngOnChanges: Function } = any>(
    source: U,
): Observable<TypedChanges<T>> {
    const onChangesPipe = [filter((args: any) => args[0] === source), map((args: any) => args[1])]
    return createLifecycleHook(source, "ngOnChanges", false, onChangesPipe)
}

export function ngOnInit<T extends { ngOnInit: Function }>(source: T): Observable<void> {
    return createLifecycleHook(source, "ngOnInit", true)
}

export function ngDoCheck<T extends { ngDoCheck: Function }>(source: T): Observable<void> {
    return createLifecycleHook(source, "ngDoCheck")
}

export function ngAfterContentInit<T extends { ngAfterContentInit: Function }>(
    source: T,
): Observable<void> {
    return createLifecycleHook(source, "ngAfterContentInit", true)
}

export function ngAfterContentChecked<T extends { ngAfterContentChecked: Function }>(
    source: T,
): Observable<void> {
    return createLifecycleHook(source, "ngAfterContentChecked")
}

export function ngAfterViewInit<T extends { ngAfterViewInit: Function }>(
    source: T,
): Observable<void> {
    return createLifecycleHook(source, "ngAfterViewInit", true)
}

export function ngAfterViewChecked<T extends { ngAfterViewChecked: Function }>(
    source: T,
): Observable<void> {
    return createLifecycleHook(source, "ngAfterViewChecked")
}

export function ngOnDestroy<T extends { ngOnDestroy: Function }>(source: T): Observable<void> {
    return createLifecycleHook(source, "ngOnDestroy", true)
}
