import { Component } from "@angular/core"

@Component({
    selector: "z-root",
    template: `
        <z-basic-editor></z-basic-editor>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "editor-example"
}
