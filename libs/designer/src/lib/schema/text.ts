import { NodeSpec } from "prosemirror-model"
import { provideEditorNodes } from "../editor/utils/create-config"

export const text: NodeSpec = {
    group: "inline",
}

export const TEXT_NODE = provideEditorNodes({
    text: text,
})
