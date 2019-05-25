import { InjectionToken } from "@angular/core"

export const ON_CHANGES = 1
export const ON_INIT = 2
export const DO_CHECK = 4
export const AFTER_CONTENT_INIT = 8
export const AFTER_CONTENT_CHECKED = 16
export const AFTER_VIEW_INIT = 32
export const AFTER_VIEW_CHECKED = 64
export const ON_DESTROY = 128

export enum NgHooksEventType {
    ngOnChanges = ON_CHANGES,
    ngOnInit = ON_INIT,
    ngDoCheck = DO_CHECK,
    ngAfterContentInit = AFTER_CONTENT_INIT,
    ngAfterContentChecked = AFTER_CONTENT_CHECKED,
    ngAfterViewInit = AFTER_VIEW_INIT,
    ngAfterViewChecked = AFTER_VIEW_CHECKED,
    ngOnDestroy = ON_DESTROY,
}

export const LIFECYCLE_FLAGS = new InjectionToken<number>("FLAGS")

export enum StateChangeStrategy {
    REATTACH = 0,
    DETACH = 1,
}

export const STATE_CHANGE_STRATEGY = new InjectionToken<StateChangeStrategy>(
    "STATE_CHANGE_STRATEGY",
)
