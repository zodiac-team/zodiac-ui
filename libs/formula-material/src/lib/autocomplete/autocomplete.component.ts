import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"

@Component({
    selector: "z-autocomplete",
    template: `
        <input
            type="text"
            [placeholder]="data.placeholder"
            [attr.aria-label]="data.ariaLabel"
            matInput
            [formControl]="model"
            [matAutocomplete]="auto"
        />
        <mat-autocomplete #auto="matAutocomplete">
            <mat-option
                *ngFor="let option of data.options || (resolve.options | async)"
                [value]="option"
            >
                {{ option }}
            </mat-option>
        </mat-autocomplete>
    `,
    styleUrls: ["./autocomplete.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AutocompleteComponent implements FormulaContext {
    public data: FormulaData
    public model: AbstractControl
    public resolve: FormulaResolveData

    constructor(ctx: FormulaContext) {
        this.data = ctx.data
        this.model = ctx.model
        this.resolve = ctx.resolve
    }
}
