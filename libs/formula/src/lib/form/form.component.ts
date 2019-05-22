import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    Optional,
    SkipSelf,
    ViewChild,
} from "@angular/core"
import { FormulaContext, FormulaOutlet, FormulaRoot } from "../interfaces"
import { FormArray, FormGroup, NgForm } from "@angular/forms"
import { isFormArray, isFormGroup } from "../node/utils"
import { FORMULA_OUTLET } from "../constants"

@Component({
    selector: "z-form",
    template: `
        <ng-container *ngIf="parent; then ngForm; else form"></ng-container>
        <ng-template #form>
            <form [ngFormOptions]="ngFormOptions">
                <ng-container [ngTemplateOutlet]="content"></ng-container>
            </form>
        </ng-template>
        <ng-template #ngForm>
            <ng-form [ngFormOptions]="ngFormOptions">
                <ng-container [ngTemplateOutlet]="content"></ng-container>
            </ng-form>
        </ng-template>
        <ng-template #content> <ng-content></ng-content> </ng-template>
    `,
    styleUrls: ["./form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements AfterViewInit {
    @ViewChild(NgForm)
    public form: NgForm

    public parent: FormComponent
    public model: FormGroup | FormArray
    public ngFormOptions: any

    private outlet: FormulaRoot

    constructor(
        ctx: FormulaContext,
        @Inject(FORMULA_OUTLET) outlet: FormulaOutlet,
        @Optional() @SkipSelf() parent: FormComponent,
    ) {
        if (isFormGroup(ctx.model) || isFormArray(ctx.model)) {
            this.model = ctx.model
        } else {
            throw new Error("<z-form> only accepts FormGroup or FormArray")
        }
        this.ngFormOptions = ctx.data.ngFormOptions || {}
        this.outlet = outlet.root
        this.parent = parent
    }

    public ngAfterViewInit() {
        if (!this.parent) {
            this.outlet.setForm(this.form)
        }
    }
}
