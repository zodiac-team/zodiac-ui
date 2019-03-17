import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { Editor } from "../interfaces"

@Component({
    selector: "z-editor-toolbar",
    template: `
        <button mat-icon-button *ngFor="let command of commands" (click)="sendCommand(command)">
            <mat-icon [innerText]="command.icon"></mat-icon>
        </button>
    `,
    styleUrls: ["./editor-toolbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarComponent {

    public commands = [
        {
            icon: 'format_bold'
        },
        {
            icon: 'format_italic'
        },
        {
            icon: 'format_underline'
        },
        {
            icon: 'format_list_bulleted'
        },
        {
            icon: 'format_list_numbered'
        },
        {
            icon: 'format_quote'
        },
        {
            icon: 'title'
        },
        {
            icon: 'format_size'
        },
        {
            icon: 'link'
        },
        {
            icon: 'format_clear'
        },
    ]

    @Input()
    public editor: Editor

    constructor() {}

    public sendCommand(command) {
        this.editor.sendCommand(command)
    }
}
