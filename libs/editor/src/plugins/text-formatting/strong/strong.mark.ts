import { MarkSpec, DOMOutputSpec } from "prosemirror-model"
import { FONT_STYLE } from "../constants"

/**
 * @name strong_mark
 */
export interface StrongDefinition {
    type: "strong"
}

const strongDOM: DOMOutputSpec = ["strong"]

export const strong: MarkSpec = {
    inclusive: true,
    group: FONT_STYLE,
    parseDOM: [
        { tag: "strong" },

        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
            tag: "b",
            getAttrs(node) {
                const element = node as HTMLElement
                return element.style.fontWeight !== "normal" && null
            },
        },
        {
            style: "font-weight",
            getAttrs(value) {
                return typeof value === "string" && /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
            },
        },
    ],
    toDOM() {
        return strongDOM
    },
}
