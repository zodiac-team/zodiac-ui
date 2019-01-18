import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { AppEffects, initialState } from "./app.store"
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(initialState),
        EffectsModule.forRoot([AppEffects]),
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "",
                loadChildren: "./feature/feature.module#FeatureModule",
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
