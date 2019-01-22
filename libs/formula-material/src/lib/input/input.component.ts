import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms"
import { ErrorStateMatcher } from "@angular/material"

/** Error when invalid control is dirty, touched, or submitted. */
export class DefaultErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
    }
}

@Component({
    selector: "z-input",
    template: `
        <mat-form-field class="z-input-mat-form-field">
            <input
                [type]="data.type"
                matInput
                [placeholder]="data.placeholder"
                [readonly]="data.readonly"
                [formControl]="model"
                [errorStateMatcher]="matcher"
            />
            <mat-hint> <span [innerHTML]="data.hint"></span> </mat-hint>
            <mat-error *ngIf="model.errors">
                <span
                    *ngFor="let obj of (model.errors | keyvalue | slice: 0:1)"
                    [innerHTML]="obj.value"
                ></span>
            </mat-error>
        </mat-form-field>
    `,
    styleUrls: ["./input.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "z-input",
    },
})
export class InputComponent implements FormulaContext {
    public data: FormulaData
    public model: AbstractControl
    public resolve: FormulaResolveData

    public matcher: DefaultErrorStateMatcher

    constructor(ctx: FormulaContext) {
        this.data = ctx.data
        this.model = ctx.model
        this.resolve = ctx.resolve
        this.matcher = new DefaultErrorStateMatcher()
    }
}
