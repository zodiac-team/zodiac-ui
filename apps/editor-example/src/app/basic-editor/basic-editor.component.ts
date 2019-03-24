import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: "z-basic",
    template: `
        <h1>Basic</h1>
        <z-editor-toolbar [editor]="editor">
            <z-strong-tool></z-strong-tool>
            <z-emphasis-tool></z-emphasis-tool>
            <z-underline-tool></z-underline-tool>
            <z-alignment-tool></z-alignment-tool>
            <z-superscript-tool></z-superscript-tool>
            <z-subscript-tool></z-subscript-tool>
            <z-strike-tool></z-strike-tool>
        </z-editor-toolbar>
        <z-editor #editor></z-editor>
    `,
    styleUrls: ["./basic-editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorComponent {}
