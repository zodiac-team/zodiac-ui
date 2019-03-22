import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { BasicModule } from "./basic/basic.module"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BasicModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
