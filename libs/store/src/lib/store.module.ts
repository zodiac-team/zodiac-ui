import { ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { provideStore, Store } from "./store.service"
import { StoreDirective } from "./store.directive"
import { STORE_ACTIONS } from "./constants"
import { Subject } from "rxjs"
import { Actions } from "./actions.service"
import { InitialState } from "./interfaces"

@NgModule({
    imports: [CommonModule],
    declarations: [StoreDirective],
    exports: [StoreDirective],
})
export class StoreModule {
    static forRoot(initialState: InitialState<any>): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
                Store,
                Actions,
                provideStore("root", initialState),
                {
                    provide: STORE_ACTIONS,
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
