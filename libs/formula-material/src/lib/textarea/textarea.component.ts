import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    NgZone,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core"
import { FormulaContext, FormulaData, FormulaResolveData } from "@zodiac-ui/formula"
import { AbstractControl } from "@angular/forms"
import { DefaultErrorStateMatcher } from "../input/input.component"
import { take } from "rxjs/operators"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"

@Component({
    selector: "z-textarea",
    template: `
        <mat-form-field class="z-textarea-mat-form-field">
            <textarea
                matInput
                [placeholder]="data.placeholder"
                [readonly]="data.readonly"
                [formControl]="model"
                [cdkTextareaAutosize]
                [cdkAutosizeMinRows]="data.minRows"
                [cdkAutosizeMaxRows]="data.maxRows"
                #autosize="cdkTextareaAutosize"
            ></textarea>
        </mat-form-field>
    `,
    styleUrls: ["./textarea.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "z-input z-textarea",
    },
})
export class TextareaComponent implements FormulaContext, AfterViewInit {
    public data: FormulaData
    public model: AbstractControl
    public resolve: FormulaResolveData
    public matcher: DefaultErrorStateMatcher

    @ViewChild("autosize")
    public autosize: CdkTextareaAutosize

    private ngZone: NgZone

    constructor(ctx: FormulaContext, ngZone: NgZone) {
        this.data = ctx.data
        this.model = ctx.model
        this.resolve = ctx.resolve
        this.matcher = new DefaultErrorStateMatcher()
        this.ngZone = ngZone
    }

    public ngAfterViewInit() {
        this.triggerResize()
    }

    public triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true))
    }
}
