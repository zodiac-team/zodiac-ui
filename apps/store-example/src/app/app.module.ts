import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { appEffects, AppEffectsContext, initialState } from "./app.store"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"
import { JsonAllModule } from "./pipes"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(initialState),
        // StoreDevtoolsModule.config({
        //     maxAge: 50,
        // }),
        EffectsModule.forRoot(appEffects, {
            context: AppEffectsContext
        }),
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "",
                loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
            },
        ]),
        JsonAllModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
