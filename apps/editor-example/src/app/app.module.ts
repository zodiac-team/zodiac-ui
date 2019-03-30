import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { BasicEditorModule } from "./basic-editor/basic-editor.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, BasicEditorModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
