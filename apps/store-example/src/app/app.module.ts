import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { EffectsModule, StoreDevtoolsModule, StoreModule } from "@zodiac-ui/store"
import { AppEffects, initialState } from "./app.store"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(initialState),
        StoreDevtoolsModule.config({
            maxAge: 50,
        }),
        EffectsModule.forRoot([AppEffects]),
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "",
                loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
