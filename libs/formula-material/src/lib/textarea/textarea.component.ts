import { ChangeDetectionStrategy, Component } from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"
import { DefaultErrorStateMatcher } from "../input/input.component"

@Component({
    selector: "z-textarea",
    template: `
        <textarea
            matInput
            [formControl]="model"
            cdkTextareaAutosize
            cdkAutosizeMinRows="data.minRows"
            cdkAutosizeMaxRows="data.maxRows"
        ></textarea>
    `,
    styleUrls: ["./textarea.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements FormulaContext {
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
