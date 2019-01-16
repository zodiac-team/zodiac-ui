import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Store, toState } from "@zodiac-ui/store"
import { AppState, GetTodos } from "./app.store"

@Component({
    selector: "z-root",
    template: `
        <ng-container *zStore="let state; in: store">
            <button (click)="incrementValue()">Increment</button>

            <pre>{{ state | json }}</pre>
        </ng-container>
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
}
