import { Component } from "@angular/core"

@Component({
    selector: "z-root",
    template: `
        <z-basic></z-basic>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "editor-example"
}
