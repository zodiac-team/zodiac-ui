import { Directive, Input } from "@angular/core"

@Directive({
    selector: "[zEditorToolbarButton]",
})
export class EditorToolbarButtonDirective {
    @Input()
    public zEditorToolbarButton

    constructor() {}
}
