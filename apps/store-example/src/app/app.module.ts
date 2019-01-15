import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { NxModule } from "@nrwl/nx"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { AppEffects, initialState } from "./app.store"
import { HttpClientModule } from "@angular/common/http"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        StoreModule.forRoot(initialState),
        EffectsModule.forRoot([AppEffects]),
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
