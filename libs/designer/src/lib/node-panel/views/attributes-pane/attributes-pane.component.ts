import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormGroup } from "@angular/forms"

@Component({
    selector: "z-attributes-pane",
    template: `
        <h4>Attributes</h4>
        <cdk-virtual-scroll-viewport itemSize="40" class="example-viewport">
            <div *cdkVirtualFor="let attr of attributes" class="example-item">
                <label [textContent]="attr.name"></label>
                <input type="text" [value]="attr.value" />
            </div>
        </cdk-virtual-scroll-viewport>
    `,
    styleUrls: ["./attributes-pane.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributesPaneComponent implements OnChanges {
    @Input()
    public value: any

    public attributes: { name: string; value: string }[]

    constructor() {}

    public ngOnChanges() {
        if (this.value) {
            this.attributes = Object.entries(this.value.attributes).map(
                ([name, value]: [string, string]) => ({ name, value }),
            )
        } else {
            this.attributes = []
        }
    }
}
