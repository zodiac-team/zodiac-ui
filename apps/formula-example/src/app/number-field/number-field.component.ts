import { ChangeDetectionStrategy, Component } from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"

@Component({
    selector: "z-number-field",
    template: `
        <label [innerHTML]="ctx.data.label"></label>
        <input [formControl]="ctx.model" type="number" />
    `,
    styleUrls: ["./number-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFieldComponent {
    constructor(public ctx: FormulaContext) {}
}
