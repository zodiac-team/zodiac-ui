import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { EffectsModule, StoreModule } from "@zodiac-ui/store"
import { AppEffects, initialState } from "./app.store"
import { HttpClientModule } from "@angular/common/http"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(initialState),
        EffectsModule.forRoot([AppEffects]),
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
