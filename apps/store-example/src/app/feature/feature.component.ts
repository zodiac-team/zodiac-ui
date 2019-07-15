import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Store } from "@zodiac-ui/store"
import { FeatureState } from "./feature.store"

@Component({
    selector: "z-feature",
    template: `
        <h2>Feature Store</h2>

        <button (click)="incrementValue()">Increment</button>

        <pre>{{ store | async | jsonAll }}</pre>
    `,
    styleUrls: ["./feature.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class FeatureComponent {
    constructor(public store: Store<FeatureState>) {}

    public incrementValue() {
        this.store.next(state => ({
            count: state.count + 3
        }))
    }
}
