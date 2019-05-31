import { NgObservable } from "./ng-observable"
import { InvokeSubject } from "./invoke-subject"
import {
    computed,
    decorateLifecycle,
    makeDecorator,
    makePropDecorator, ngAfterContentChecked,
    ngAfterViewChecked,
    ngOnChanges, ngOnInit,
} from "./internals/decorators"
import { ngAfterContentInit, ngAfterViewInit, ngDoCheck, ngOnDestroy } from "../operators/lifecycle"

/**
 * Type of the Computed decorator / constructor function.
 *
 * @publicApi
 */
export interface ComputedDecorator {
    /**
     * Derive a lazily evaluated value from other values on the class instance.
     *
     * @usageNotes
     *
     * ```typescript
     * export interface MyState {
     *    firstName: string
     *    lastName: string
     * }
     *
     * // this example is not memoized
     * export const $fullName = () => (state: MyState) => state.firstName + " " + state.lastName
     *
     * @Component()
     * export class MyComponent implements MyState {
     *    @Computed<string>($fullName)
     *    readonly fullName: string
     * }
     *
     * ```
     *
     * Use factory functions when creating memoized selectors so that each instance of the class gets its own cache. For example:
     *
     * ```typescript
     * // This example uses createSelector from @ngrx/store
     * const $myState = (state: MyState) => state
     * const $fullName = createSelector(
     * $myState,
     * state => state.firstName + " " + state.lastName,
     * )
     * // Don't do this!
     * const $selectFullName = () => $fullName
     * // Wrap call to createSelector inside factory
     * const $selectFullName = () =>
     * createSelector(
     * $myState,
     * state => state.firstName + " " + state.lastName,
     * )
     * ```
     *
     * @Annotation
     * @publicApi
     */
    <T>(selectorFactory: () => (state: any) => T): any;
    new <T>(selectorFactory: () => (state: any) => T): any;
}

/**
 * Type of the Computed metadata.
 *
 * @publicApi
 */
export interface Computed {
    /**
     * A selector factory function that will create a new selector for each class instance that
     * calculates the value of the decorated property.
     */
    selectorFactory: <T>() => (state: any) => T
}

/**
 * @Annotation
 * @publicApi
 */
export const Computed: ComputedDecorator = makePropDecorator(computed)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgOnChangesDecorator {
    /**
     * NgOnChanges lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * export type MyProps = Pick<MyComponent, "firstName", "lastName">
     *
     * @Component()
     * export class MyComponent extends NgObservable implements MyProps {
     *     @Input() firstName: string
     *     @Input() lastName: string
     *
     *     @NgOnChanges()
     *     public runOnChanges(changes: TypedChanges<MyProps>) {
     *        // Will be called after OnChanges hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgOnChanges metadata.
 *
 * @publicApi
 */
export interface NgOnChanges {}

/**
 * @Annotation
 * @publicApi
 */
export const NgOnChanges = makePropDecorator(ngOnChanges)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgOnInitDecorator {
    /**
     * NgOnInit lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgOnInit()
     *     public runOnInit() {
     *        // Will be called after OnInit hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgOnInit metadata.
 *
 * @publicApi
 */
export interface NgOnInit {}

/**
 * @Annotation
 * @publicApi
 */
export const NgOnInit = makePropDecorator(ngOnInit)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgDoCheckDecorator {
    /**
     * NgDoCheck lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgDoCheck()
     *     public runDoCheck() {
     *        // Will be called after DoCheck hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgDoCheck metadata.
 *
 * @publicApi
 */
export interface NgDoCheck {}

/**
 * @Annotation
 * @publicApi
 */
export const NgDoCheck = makePropDecorator(ngDoCheck)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgAfterContentInitDecorator {
    /**
     * NgAfterContentInit lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgAfterContentInit()
     *     public runAfterContentInit() {
     *        // Will be called after AfterContentInit hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgAfterContentInit metadata.
 *
 * @publicApi
 */
export interface NgAfterContentInit {}

/**
 * @Annotation
 * @publicApi
 */
export const NgAfterContentInit = makePropDecorator(ngAfterContentInit)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgAfterContentCheckedDecorator {
    /**
     * NgAfterContentChecked lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgAfterContentChecked()
     *     public runAfterContentChecked() {
     *        // Will be called after AfterContentChecked hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgAfterContentChecked metadata.
 *
 * @publicApi
 */
export interface NgAfterContentChecked {}

/**
 * @Annotation
 * @publicApi
 */
export const NgAfterContentChecked = makePropDecorator(ngAfterContentChecked)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgAfterViewInitDecorator {
    /**
     * NgAfterViewInit lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgAfterViewInit()
     *     public runAfterViewInit() {
     *        // Will be called after AfterViewInit hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgAfterViewInit metadata.
 *
 * @publicApi
 */
export interface NgAfterViewInit {}

/**
 * @Annotation
 * @publicApi
 */
export const NgAfterViewInit = makePropDecorator(ngAfterViewInit)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgAfterViewCheckedDecorator {
    /**
     * NgAfterViewChecked lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgAfterViewChecked()
     *     public runAfterViewChecked() {
     *        // Will be called after AfterViewChecked hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgAfterViewChecked metadata.
 *
 * @publicApi
 */
export interface NgAfterViewChecked {}

/**
 * @Annotation
 * @publicApi
 */
export const NgAfterViewChecked = makePropDecorator(ngAfterViewChecked)

/**
 * Type of the NgOnChangesDecorator decorator / constructor function.
 *
 * @publicApi
 */
export interface NgOnDestroyDecorator {
    /**
     * NgOnDestroy lifecycle hook decorator
     *
     * @usageNotes
     *
     * ```ts
     * @Component()
     * export class MyComponent extends NgObservable {
     *     @NgOnDestroy()
     *     public runOnDestroy() {
     *        // Will be called after OnDestroy hook
     *     }
     * }
     * ```
     *
     * @Annotation
     * @publicApi
     */
    (): void
    new (): void
}

/**
 * Type of the NgOnDestroy metadata.
 *
 * @publicApi
 */
export interface NgOnDestroy {}

/**
 * @Annotation
 * @publicApi
 */
export const NgOnDestroy = makePropDecorator(ngOnDestroy)



