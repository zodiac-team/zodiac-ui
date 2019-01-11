import { ChangeDetectionStrategy, Component } from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"

@Component({
    selector: "z-text-field",
    template: `
        <label [innerHTML]="ctx.data.label"></label> <input [formControl]="ctx.model" />
    `,
    styleUrls: ["./text-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
    constructor(public ctx: FormulaContext) {}
}
