import { Component } from "@angular/core"

@Component({
    selector: "z-root",
    template: `
        <z-editor-toolbar [editor]="editor"></z-editor-toolbar>
        <z-editor #editor></z-editor>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "blog-example"
}
