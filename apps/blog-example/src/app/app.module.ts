import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { BlogModule, EditorModule, EditorToolbarModule } from "@zodiac-ui/blog"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BlogModule, EditorModule, EditorToolbarModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
