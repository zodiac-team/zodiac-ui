import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FeatureComponent } from "./feature.component"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { featureEffects, FeatureEffectsContext, initialState } from "./feature.store"
import { RouterModule } from "@angular/router"
import { JsonAllModule } from "../pipes"

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forChild("feature", initialState),
        EffectsModule.forChild(featureEffects, {
            context: FeatureEffectsContext
        }),
        RouterModule.forChild([
            {
                path: "",
                component: FeatureComponent,
            },
        ]),
        JsonAllModule
    ],
    declarations: [FeatureComponent],
    exports: [FeatureComponent],
})
export class FeatureModule {}
