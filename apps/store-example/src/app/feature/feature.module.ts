import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FeatureComponent } from "./feature.component"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { FeatureEffects, initialState } from "./feature.store"
import { RouterModule } from "@angular/router"

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forChild("feature", initialState),
        EffectsModule.forChild([FeatureEffects]),
        RouterModule.forChild([
            {
                path: "",
                component: FeatureComponent,
            },
        ]),
    ],
    declarations: [FeatureComponent],
    exports: [FeatureComponent],
})
export class FeatureModule {}
