import { ChangeDetectionStrategy, Component } from "@angular/core"
import { EditorState } from "prosemirror-state"

@Component({
    selector: "z-basic-editor",
    template: `
        <div class="toolbar">
            <z-editor-toolbar [editor]="editor">
                <z-heading-tool></z-heading-tool>
                <z-strong-tool></z-strong-tool>
                <z-emphasis-tool></z-emphasis-tool>
                <z-underline-tool></z-underline-tool>
                <z-alignment-tool></z-alignment-tool>
                <z-superscript-tool></z-superscript-tool>
                <z-subscript-tool></z-subscript-tool>
                <z-strike-tool></z-strike-tool>
                <z-link-tool></z-link-tool>
            </z-editor-toolbar>
        </div>
        <z-editor #editor [state]="state" (stateChange)="save($event.state)"></z-editor>
    `,
    styleUrls: ["./basic-editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorComponent {

    public state: any

    constructor() {
        this.state = JSON.parse(localStorage.getItem('basic-editor-state'))
    }

    public save(state: EditorState) {
        try {
            localStorage.setItem('basic-editor-state', JSON.stringify(state.toJSON()))
        } catch (e) {
            console.error('Document too large to save or contains errors')
            console.error(e)
        }
    }
}
