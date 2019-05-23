import { DOMOutputSpec, NodeSpec } from "prosemirror-model"
import { provideEditorNodes } from "../editor/utils/create-config"

const bodyDOM: DOMOutputSpec = ["div", { class: "body" }, 0]
export const bodyNode: NodeSpec = {
    content: "block*",
    marks: "",
    selectable: true,
    draggable: false,
    attrs: {},
    parseDOM: [{ tag: "div.body" }],
    toDOM() {
        return bodyDOM
    },
}

export const BODY_NODE = provideEditorNodes({
    body: bodyNode,
})
