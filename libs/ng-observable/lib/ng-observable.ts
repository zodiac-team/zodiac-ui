import { TypedChanges } from "./interfaces"
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit,
} from "@angular/core"
import { InvokeSubject } from "./invoke-subject"
import { mixins } from "./internals/apply-mixins"
import { UseHooks } from "./internals/use-hooks"

/**
 * Implements all of the builtin lifecycle hooks provided by Angular and makes them observable.
 *
 * @usageNotes
 *
 * ```ts
 * @Component()
 * export class MyComponent extends NgObservable {
 *     constructor() {
 *         ngOnInit(this).subscribe(() => {
 *             console.log("ngOnInit")
 *         })
 *     }
 * }
 * ```
 *
 * @publicApi
 */
export abstract class NgObservable
    implements
        OnInit,
        OnChanges,
        DoCheck,
        OnDestroy,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked {
    static [mixins] = UseHooks(255)(NgObservable)

    /**
     * OnChanges lifecycle hook
     *
     * @param changes Simple changes can be strongly typed where input props are known
     */
    public ngOnChanges(changes: TypedChanges<any>): void {
        ;(<InvokeSubject<any>>this.ngOnChanges).next([this, changes])
    }

    /**
     * OnInit lifecycle hook
     */
    public ngOnInit(): void {
        ;(<InvokeSubject<any>>this.ngOnInit).next(this)
    }

    /**
     * ngDoCheck lifecycle hook
     */
    public ngDoCheck() {
        ;(<InvokeSubject<any>>this.ngDoCheck).next(this)
    }

    /**
     * ngAfterContentInit lifecycle hook
     */
    public ngAfterContentInit() {
        ;(<InvokeSubject<any>>this.ngAfterContentInit).next(this)
    }

    /**
     * ngAfterContentChecked lifecycle hook
     */
    public ngAfterContentChecked() {
        ;(<InvokeSubject<any>>this.ngAfterContentChecked).next(this)
    }

    /**
     * ngAfterViewInit lifecycle hook
     */
    public ngAfterViewInit() {
        ;(<InvokeSubject<any>>this.ngAfterViewInit).next(this)
    }

    /**
     * ngAfterViewChecked lifecycle hook
     */
    public ngAfterViewChecked() {
        ;(<InvokeSubject<any>>this.ngAfterViewChecked).next(this)
    }

    /**
     * ngOnDestroy lifecycle hook
     */
    public ngOnDestroy() {
        ;(<InvokeSubject<any>>this.ngOnDestroy).next(this)
    }
}
