import { Component } from "@angular/core"

@Component({
    selector: "z-root",
    template: `
        <z-blog></z-blog>
    `,
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "blog-example"
}
