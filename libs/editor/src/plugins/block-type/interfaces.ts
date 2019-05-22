// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// (there are also different blocks for different types of panel, when
// they're really all just a panel node)
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.

export interface MessageDescriptor {
    id: string
    description: string
    defaultMessage: string
}

export const messages = <{ [key in BlockTypeName]: MessageDescriptor }>{
    normal: {
        id: "fabric.editor.normal",
        defaultMessage: "Normal text",
        description: "This is the default text style",
    },
    heading1: {
        id: "fabric.editor.heading1",
        defaultMessage: "Heading 1",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    heading2: {
        id: "fabric.editor.heading2",
        defaultMessage: "Heading 2",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    heading3: {
        id: "fabric.editor.heading3",
        defaultMessage: "Heading 3",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    heading4: {
        id: "fabric.editor.heading4",
        defaultMessage: "Heading 4",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    heading5: {
        id: "fabric.editor.heading5",
        defaultMessage: "Heading 5",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    heading6: {
        id: "fabric.editor.heading6",
        defaultMessage: "Heading 6",
        description:
            "Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)",
    },
    blockquote: {
        id: "fabric.editor.blockquote",
        defaultMessage: "Quote",
        description: "Quote some text",
    },
    codeblock: {
        id: "fabric.editor.codeblock",
        defaultMessage: "Code snippet",
        description: "Insert a snippet/segment of code (code block)",
    },
    panel: {
        id: "fabric.editor.panel",
        defaultMessage: "Panel",
        description:
            "Visually distinguishes your text by adding a background colour (blue, purple, yellow, green, red)",
    },
    notePanel: {
        id: "fabric.editor.notePanel",
        defaultMessage: "Note panel",
        description: "Visually distinguishes your text by adding a note panel",
    },
    successPanel: {
        id: "fabric.editor.successPanel",
        defaultMessage: "Success panel",
        description: "Visually distinguishes your text by adding a success panel",
    },
    warningPanel: {
        id: "fabric.editor.warningPanel",
        defaultMessage: "Warning panel",
        description: "Visually distinguishes your text by adding a warning panel",
    },
    errorPanel: {
        id: "fabric.editor.errorPanel",
        defaultMessage: "Error panel",
        description: "Visually distinguishes your text by adding a error panel",
    },
    other: {
        id: "fabric.editor.other",
        defaultMessage: "Others...",
        description: "Other text formatting",
    },
}

export const NORMAL_TEXT: BlockType = {
    name: "normal",
    title: messages.normal,
    nodeName: "paragraph",
    tagName: "p",
}

export const HEADING_1: BlockType = {
    name: "heading1",
    title: messages.heading1,
    nodeName: "heading",
    tagName: "h1",
    level: 1,
}
export const HEADING_2: BlockType = {
    name: "heading2",
    title: messages.heading2,
    nodeName: "heading",
    tagName: "h2",
    level: 2,
}
export const HEADING_3: BlockType = {
    name: "heading3",
    title: messages.heading3,
    nodeName: "heading",
    tagName: "h3",
    level: 3,
}
export const HEADING_4: BlockType = {
    name: "heading4",
    title: messages.heading4,
    nodeName: "heading",
    tagName: "h4",
    level: 4,
}
export const HEADING_5: BlockType = {
    name: "heading5",
    title: messages.heading5,
    nodeName: "heading",
    tagName: "h5",
    level: 5,
}
export const HEADING_6: BlockType = {
    name: "heading6",
    title: messages.heading6,
    nodeName: "heading",
    tagName: "h6",
    level: 6,
}
export const BLOCK_QUOTE: BlockType = {
    name: "blockquote",
    title: messages.blockquote,
    nodeName: "blockquote",
}
export const CODE_BLOCK: BlockType = {
    name: "codeblock",
    title: messages.codeblock,
    nodeName: "codeBlock",
}
export const PANEL: BlockType = {
    name: "panel",
    title: messages.panel,
    nodeName: "panel",
}
export const OTHER: BlockType = {
    name: "other",
    title: messages.other,
    nodeName: "",
}

export const TEXT_BLOCK_TYPES = [
    NORMAL_TEXT,
    HEADING_1,
    HEADING_2,
    HEADING_3,
    HEADING_4,
    HEADING_5,
    HEADING_6,
]

export const WRAPPER_BLOCK_TYPES = [BLOCK_QUOTE, CODE_BLOCK, PANEL]
export const ALL_BLOCK_TYPES = TEXT_BLOCK_TYPES.concat(WRAPPER_BLOCK_TYPES)

export const HEADINGS_BY_LEVEL = TEXT_BLOCK_TYPES.reduce((acc, blockType) => {
    if (blockType.level && blockType.nodeName === "heading") {
        acc[blockType.level] = blockType
    }

    return acc
}, {})

export const HEADINGS_BY_NAME = TEXT_BLOCK_TYPES.reduce(
    (acc, blockType) => {
        if (blockType.level && blockType.nodeName === "heading") {
            acc[blockType.name] = blockType
        }

        return acc
    },
    {} as { [blockType: string]: BlockType },
)

export type BlockTypeName =
    | "normal"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "blockquote"
    | "codeblock"
    | "panel"
    | "notePanel"
    | "successPanel"
    | "warningPanel"
    | "errorPanel"
    | "other"

export interface BlockType {
    name: string
    title: MessageDescriptor
    nodeName: string
    tagName?: string
    level?: number
}

export type HeadingLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6
