import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"

@Component({
    selector: "z-select",
    template: `
        <mat-form-field class="z-select-mat-form-field">
            <mat-select placeholder="Favorite food" [formControl]="model">
                <mat-option *ngFor="let option of data.options" [value]="option.value">
                    {{ option.viewValue }}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `,
    styleUrls: ["./select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "z-input z-select"
    }
})
export class SelectComponent implements FormulaContext {
    public data: FormulaData
    public model: AbstractControl
    public resolve: FormulaResolveData

    constructor(ctx: FormulaContext) {
        this.data = ctx.data
        this.model = ctx.model
        this.resolve = ctx.resolve
    }
}
