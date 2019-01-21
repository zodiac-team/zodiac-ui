import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"

@Component({
    selector: "z-select",
    template: `
        <mat-select placeholder="Favorite food" [formControl]="model">
            <mat-option *ngFor="let option of (resolve.options || data.options) | async" [value]="option.value">
                {{ option.viewValue }}
            </mat-option>
        </mat-select>
    `,
    styleUrls: ["./select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
