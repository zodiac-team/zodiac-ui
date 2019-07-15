import { ChangeDetectionStrategy, Component } from "@angular/core"
import { GlobalStore, Store } from "@zodiac-ui/store"
import { AppState, initialState } from "./app.store"

@Component({
    selector: "z-root",
    template: `
        <div>
            <h2>Global Store</h2>

            <pre>{{ global | async | jsonAll:4:true }}</pre>
        </div>
        
        <div>
            <h2>Root Store</h2>
            <button (click)="incrementValue()">Increment</button>
            <button (click)="reset()">Reset</button>

            <pre>{{ state | async | jsonAll }}</pre>
        </div>

        <div><router-outlet></router-outlet></div>
            
    `,
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public store: Store<AppState>
    public global: GlobalStore
    public state: any

    constructor(store: Store<AppState>, global: GlobalStore) {
        this.global = global
        this.store = store
        this.state = store
    }

    public incrementValue() {
        this.store.next(state => ({
            count: state.count + 1
        }))
    }

    public reset() {
        this.store.next(initialState)
    }
}
