import { MarkSpec, DOMOutputSpec } from "prosemirror-model"
import { FONT_STYLE } from "../constants"

/**
 * @name em_mark
 */
export interface EmDefinition {
    type: "em"
}

const emDOM: DOMOutputSpec = ["em"]
export const em: MarkSpec = {
    inclusive: true,
    group: FONT_STYLE,
    parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
    toDOM() {
        return emDOM
    },
}
