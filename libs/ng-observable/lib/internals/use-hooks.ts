import { InvokeSubject } from "../invoke-subject"
import { createMask } from "./create-mask"

/**
 * Future API for declaring lifecycle hooks at runtime without extending a base class. Will
 * become available if/when Angular supports runtime lifecycle hooks that work AoT or when
 * the compiler can be configured to add lifecycle features without adding them to the class.
 *
 * @param flags Enum flags for toggling which lifecycle hooks to enable
 *
 */
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
