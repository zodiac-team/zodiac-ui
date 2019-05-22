import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { FormulaContext } from "@zodiac-ui/formula"
import { Node } from "prosemirror-model"

function getStyles() {
    return Object.keys(document.createElement("span").style)
}
function createStyles(node: Node) {
    return {}
}

@Component({
    selector: "z-styles-pane",
    template: `
        <h4>Styles</h4>
        <div class="checkbox">
            <mat-checkbox [formControl]="showAll">Show All</mat-checkbox>
        </div>
        <cdk-virtual-scroll-viewport itemSize="32" class="example-viewport">
            <div *cdkVirtualFor="let style of showStyles" class="example-item">
                <label [textContent]="style.name"></label>
                <input type="text" [value]="style.value || ''" />
            </div>
        </cdk-virtual-scroll-viewport>
    `,
    styleUrls: ["./styles-pane.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesPaneComponent implements OnChanges {
    @Input()
    public value: any

    public showAll: FormControl

    public showStyles: { name: string; value: string }[]

    public styleNames = getStyles()

    constructor() {
        this.showAll = new FormControl(false)

        this.showAll.valueChanges.subscribe(() => {
            if (this.value) {
                this.filterStyles()
            }
        })
    }

    ngOnChanges() {
        if (this.value) {
            this.filterStyles()
        } else {
            this.showStyles = []
        }
    }

    filterStyles() {
        this.showStyles = this.styleNames
            .filter(styleName => this.value.style[styleName] || this.showAll.value)
            .map(styleName => ({
                name: styleName,
                value: this.value.style[styleName],
            }))
    }
}
