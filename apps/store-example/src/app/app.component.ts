import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Store, toState } from "@zodiac-ui/store"
import { AppState, GetTodos } from "./app.store"

@Component({
    selector: "z-root",
    template: `
        <div *zStore="let state; in: store">
            <h2>Root Store</h2>

            <button (click)="incrementValue()">Increment</button>
            <button (click)="reset()">Reset</button>

            <pre>{{ state | json }}</pre>
        </div>

        <div><router-outlet></router-outlet></div>
    `,
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public store: Store<AppState>

    constructor(store: Store<AppState>) {
        this.store = store
        this.store.dispatch(new GetTodos("https://jsonplaceholder.typicode.com/todos/1"))
    }

    public incrementValue() {
        this.store.setState(state => {
            state.count = state.count + 1
        })
    }

    public reset() {
        this.store.setState(this.store.initialState)
    }
}
