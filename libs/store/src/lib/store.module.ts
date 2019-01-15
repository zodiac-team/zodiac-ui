import { ModuleWithProviders, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { provideStore, Store } from "./store.service"
import { StoreDirective } from "./store.directive"

@NgModule({
    imports: [CommonModule],
    declarations: [StoreDirective],
    exports: [StoreDirective],
})
export class StoreModule {
    static forRoot(initialState: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [Store, provideStore("root", initialState)],
        }
    }

    static forChild(feature: string, initialState: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [provideStore(feature, initialState)],
        }
    }
}
