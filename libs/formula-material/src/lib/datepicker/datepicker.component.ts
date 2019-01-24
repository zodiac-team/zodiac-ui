import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"

@Component({
    selector: "z-datepicker",
    template: `
        <mat-form-field class="z-datepicker-mat-form-field">
            <input
                matInput
                [readonly]="data.readonly"
                [placeholder]="data.placeholder"
                [matDatepicker]="picker"
                [formControl]="model"
            />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
    `,
    styleUrls: ["./datepicker.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "z-input z-datepicker",
    },
})
export class DatepickerComponent implements FormulaContext {
    public data: FormulaData
    public model: AbstractControl
    public resolve: FormulaResolveData

    constructor(ctx: FormulaContext) {
        this.data = ctx.data
        this.model = ctx.model
        this.resolve = ctx.resolve
    }
}
