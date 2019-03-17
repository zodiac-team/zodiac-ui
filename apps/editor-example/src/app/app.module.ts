import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { EditorModule, EditorToolbarModule } from "@zodiac-ui/editor";
import { BasicComponent } from './basic/basic.component'

@NgModule({
    declarations: [AppComponent, BasicComponent],
    imports: [BrowserModule, EditorModule, EditorToolbarModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
