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
import { createMask } from "./internals/create-mask"

export function UseHooks(...flags: number[]) {
    const features = createMask(...flags)
    return function(target: any) {
        if (features & 1) {
            target.prototype.ngOnChanges = new InvokeSubject(target.prototype.ngOnChanges)
        }
        if (features & 2) {
            target.prototype.ngOnInit = new InvokeSubject(target.prototype.ngOnInit)
        }
        if (features & 4) {
            target.prototype.ngDoCheck = new InvokeSubject(target.prototype.ngDoCheck)
        }
        if (features & 8) {
            target.prototype.ngAfterContentInit = new InvokeSubject(
                target.prototype.ngAfterContentInit,
            )
        }
        if (features & 16) {
            target.prototype.ngAfterContentChecked = new InvokeSubject(
                target.prototype.ngAfterContentChecked,
            )
        }
        if (features & 32) {
            target.prototype.ngAfterViewInit = new InvokeSubject(target.prototype.ngAfterViewInit)
        }
        if (features & 64) {
            target.prototype.ngAfterViewChecked = new InvokeSubject(
                target.prototype.ngAfterViewChecked,
            )
        }
        if (features & 128) {
            target.prototype.ngOnDestroy = new InvokeSubject(target.prototype.ngOnDestroy)
        }
    }
}

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

    public ngOnChanges(changes: TypedChanges<any>): void {
        ;(<InvokeSubject<any>>this.ngOnChanges).next([this, changes])
    }

    public ngOnInit(): void {
        ;(<InvokeSubject<any>>this.ngOnInit).next(this)
    }

    public ngDoCheck() {
        ;(<InvokeSubject<any>>this.ngDoCheck).next(this)
    }

    public ngAfterContentInit() {
        ;(<InvokeSubject<any>>this.ngAfterContentInit).next(this)
    }

    public ngAfterContentChecked() {
        ;(<InvokeSubject<any>>this.ngAfterContentChecked).next(this)
    }

    public ngAfterViewInit() {
        ;(<InvokeSubject<any>>this.ngAfterViewInit).next(this)
    }

    public ngAfterViewChecked() {
        ;(<InvokeSubject<any>>this.ngAfterViewChecked).next(this)
    }

    public ngOnDestroy() {
        ;(<InvokeSubject<any>>this.ngOnDestroy).next(this)
    }
}
