import { makePropertyMapper } from "./make-property-mapper"
import { InvokeSubject } from "../invoke-subject"
import { NgObservable } from "../ng-observable"

export function makeDecorator(decorator: Function): any {
    return decorator
}

export function makePropDecorator(decorator: Function): any {
    return decorator
}

export function computed<R extends unknown = never, T extends any = any, U extends string = string>(
    selectorFactory: () => (state: any) => T & R,
) {
    return function(target: any, propertyKey: U) {
        makePropertyMapper(target, propertyKey, selectorFactory)
    }
}

export function decorateLifecycle(target: any, propertyKey: string, name: string) {
    const originalHook: any = target[name]
    target[name] = new InvokeSubject(function(this: any, ...args: any[]) {
        this[propertyKey].apply(this, args)
        originalHook.apply(this, args)
    })
}

export function ngOnChanges<T extends NgObservable>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey: string) {
        return decorateLifecycle(target, propertyKey, "ngOnChanges")
    }
}

export function ngOnInit<T extends NgObservable>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngOnInit")
    }
}

export function ngDoCheck<T extends NgObservable>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngDoCheck")
    }
}

export function ngAfterContentInit<T extends NgObservable>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterContentInit")
    }
}

export function ngAfterContentChecked<T extends NgObservable>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterContentChecked")
    }
}

export function ngAfterViewInit<T extends NgObservable>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterViewInit")
    }
}

export function ngAfterViewChecked<T extends NgObservable>(): (
    target: T,
    propertyKey: string,
) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngAfterViewChecked")
    }
}

export function ngOnDestroy<T extends NgObservable>(): (target: T, propertyKey: string) => void {
    return function(target, propertyKey) {
        return decorateLifecycle(target, propertyKey, "ngOnDestroy")
    }
}

