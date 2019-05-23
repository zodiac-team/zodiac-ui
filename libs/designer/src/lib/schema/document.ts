import { NodeSpec } from "prosemirror-model"
import { provideEditorNodes } from "../editor/utils/create-config"

export const document: NodeSpec = {
    content: "body",
    attrs: {},
    marks: "",
}

export const DOCUMENT_NODE = provideEditorNodes({
    document: document,
})
