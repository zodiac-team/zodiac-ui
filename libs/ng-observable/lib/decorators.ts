import { makePropertyMapper } from "./internals/make-property-mapper"
import { NgObservable } from "./ng-observable"

export function Computed<R extends unknown = never, T extends any = any, U extends string = string>(
    selectorFactory: () => (state: any) => T & R,
) {
    return function(target: any, propertyKey: U) {
        makePropertyMapper(target, propertyKey, selectorFactory)
    }
}

export function decorateLifecycle(target: any, propertyKey: string, name: string) {
    const originalHook: any = target[name]
    target[name] = function(...args: any[]) {
        this[propertyKey].apply(this, args)
        originalHook.apply(this, args)
    }
}

export function NgOnChanges<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey: string) {
        return decorateLifecycle(target, propertyKey, "ngOnChanges")
    }
}

export function NgOnInit<T extends NgObservable<any>>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngOnInit")
    }
}

export function NgDoCheck<T extends NgObservable<any>>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngDoCheck")
    }
}

export function NgAfterContentInit<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterContentInit")
    }
}

export function NgAfterContentChecked<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterContentChecked")
    }
}

export function NgAfterViewInit<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterViewInit")
    }
}

export function NgAfterViewChecked<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterViewChecked")
    }
}

export function NgOnDestroy<T extends NgObservable<any>>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngOnDestroy")
    }
}
