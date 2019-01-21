import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"

@Component({
    selector: "z-form-field",
    template: `
        <mat-form-field> <z-formula-outlet></z-formula-outlet> </mat-form-field>
    `,
    styleUrls: ["./form-field.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {}
