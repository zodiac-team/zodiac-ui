import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Store } from "@zodiac-ui/store"
import { FeatureState } from "./feature.store"

@Component({
    selector: "z-feature",
    template: `
        <h2>Feature Store</h2>

        <button (click)="incrementValue()">Increment</button>

        <ng-container *zStore="let state; in: store">
            <pre>{{ state | json }}</pre>
        </ng-container>
    `,
    styleUrls: ["./feature.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class FeatureComponent {
    constructor(public store: Store<FeatureState>) {}

    public incrementValue() {
        this.store.setState(state => {
            state.count += 3
        })
    }
}
