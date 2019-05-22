import { Command } from "@angular/cli/models/command"
import { Editor } from "../../../editor/interfaces"
import { EditorState, NodeSelection } from "prosemirror-state"
import { hasParentNode } from "prosemirror-utils"

export class Tool {
    public enable: (state: EditorState) => boolean
    public active: (state: EditorState) => boolean
    public select: (state: EditorState) => boolean
    public readonly run: Command

    private editor: Editor

    constructor(editor: Editor) {}
}

export function isBodyActive(state: EditorState) {
    const { body } = state.schema.nodes
    return hasParentNode(node => node.type === body)(state.selection)
}
