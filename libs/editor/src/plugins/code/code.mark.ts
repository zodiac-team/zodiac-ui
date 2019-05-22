import { MarkSpec } from "prosemirror-model"
import { COLOR, FONT_STYLE, LINK, SEARCH_QUERY } from "./constants"

/**
 * @name code_mark
 */
export interface CodeDefinition {
    type: "code"
}

export const code: MarkSpec = {
    excludes: `${FONT_STYLE} ${LINK} ${SEARCH_QUERY} ${COLOR}`,
    inclusive: true,
    parseDOM: [
        { tag: "span.code", preserveWhitespace: true },
        { tag: "code", preserveWhitespace: true },
        { tag: "tt", preserveWhitespace: true },
        {
            tag: "span",
            preserveWhitespace: true,
            getAttrs: domNode => {
                const dom = domNode as HTMLSpanElement
                if (dom.style.whiteSpace === "pre") {
                    return {}
                }
                if (
                    dom.style.fontFamily &&
                    dom.style.fontFamily.toLowerCase().indexOf("monospace") >= 0
                ) {
                    return {}
                }
                return false
            },
        },
    ],
    toDOM() {
        return [
            "span",
            {
                style: "white-space: pre-wrap;",
                class: "code",
            },
        ]
    },
}
