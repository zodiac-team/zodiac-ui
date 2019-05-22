import { DOMOutputSpec, NodeSpec } from "prosemirror-model"
import { provideEditorNodes } from "../editor/utils/create-config"

export type Style = { [key: string]: string | number | undefined }

export const serializeStyle = (style: Style): string => {
    return Object.keys(style).reduce((memo, key) => {
        if (style[key] === undefined) {
            return memo
        }

        const value = String(style[key]).replace(/"/g, "'")
        return (memo += `${key}: ${value};`)
    }, "")
}

function imgDOM(node): DOMOutputSpec {
    return [
        "img",
        {
            src: node.attrs.src,
            style: node.attrs.style,
        },
    ]
}

export const imgNode: NodeSpec = {
    group: "block",
    atom: true,
    parseDOM: [
        {
            tag: "img",
            getAttrs(node: HTMLElement | string) {
                if (typeof node === "string") {
                    return {}
                } else {
                    return {
                        src: node.getAttribute("src"),
                    }
                }
            },
        },
    ],
    attrs: {
        src: {
            default: null,
        },
        style: {
            default: {},
        },
    },
    toDOM: imgDOM,
}

export const IMG_NODE = provideEditorNodes({
    img: imgNode,
})
