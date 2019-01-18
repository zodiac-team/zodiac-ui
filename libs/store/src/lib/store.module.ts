import { ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { provideStore } from "./store.service"
import { StoreDirective } from "./store.directive"
import { STORE_ACTIONS_OBSERVER } from "./constants"
import { Subject } from "rxjs"
import { Actions } from "./actions.service"
import { InitialState } from "./interfaces"

@NgModule({
    imports: [CommonModule],
    declarations: [StoreDirective],
    exports: [StoreDirective],
    providers: [],
})
export class StoreModule {
    static forRoot(initialState: InitialState<any>): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                Actions,
                provideStore("root", initialState),
                {
                    provide: STORE_ACTIONS_OBSERVER,
                    useClass: Subject,
                },
            ],
        }
    }

    static forChild(feature: string, initialState: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [provideStore(feature, initialState)],
        }
    }
}
