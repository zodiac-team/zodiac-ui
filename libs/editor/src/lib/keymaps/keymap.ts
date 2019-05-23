import { Command } from "../interfaces/command"
import { browser } from "./browser"

export const toggleBold = makeKeyMapWithCommon("Bold", "Mod-b")
export const toggleItalic = makeKeyMapWithCommon("Italic", "Mod-i")
export const toggleUnderline = makeKeyMapWithCommon("Underline", "Mod-u")
export const toggleStrikethrough = makeKeyMapWithCommon("Strikethrough", "Mod-Shift-s")
export const toggleCode = makeKeyMapWithCommon("Code", "Mod-Shift-m")
export const pastePlainText = makeKeyMapWithCommon("Paste Plain Text", "Mod-Shift-v")
export const clearFormatting = makeKeyMapWithCommon("Clear formatting", "Mod-\\")
export const setNormalText = makeKeymap("Normal text", "", "Cmd-Alt-0")
export const toggleHeading1 = makeKeymap("Heading 1", "", "Cmd-Alt-1")
export const toggleHeading2 = makeKeymap("Heading 2", "", "Cmd-Alt-2")
export const toggleHeading3 = makeKeymap("Heading 3", "", "Cmd-Alt-3")
export const toggleHeading4 = makeKeymap("Heading 4", "", "Cmd-Alt-4")
export const toggleHeading5 = makeKeymap("Heading 5", "", "Cmd-Alt-5")
export const toggleOrderedList = makeKeymap("Numbered list", "", "Cmd-Shift-7")
export const toggleBulletList = makeKeymap("Bullet list", "", "Cmd-Shift-8")
export const toggleBlockQuote = makeKeymap("Quote", "", "Cmd-Alt-9")
export const toggleSuperscript = makeKeyMapWithCommon("Superscript", "Mod-+")
export const toggleSubscript = makeKeyMapWithCommon("Subscript", "Mod--")
export const insertNewLine = makeKeyMapWithCommon("Insert new line", "Shift-Enter")
export const shiftBackspace = makeKeyMapWithCommon("Shift Backspace", "Shift-Backspace")
export const splitCodeBlock = makeKeyMapWithCommon("Split code block", "Enter")
export const splitListItem = makeKeyMapWithCommon("Split list item", "Enter")
export const insertRule = makeKeyMapWithCommon("Insert horizontal rule", "Mod-Shift--")
export const undo = makeKeyMapWithCommon("Undo", "Mod-z")
export const moveUp = makeKeyMapWithCommon("Move up", "ArrowUp")
export const moveDown = makeKeyMapWithCommon("Move down", "ArrowDown")
export const moveLeft = makeKeyMapWithCommon("Move left", "ArrowLeft")
export const moveRight = makeKeyMapWithCommon("Move right", "ArrowRight")
export const indentList = makeKeyMapWithCommon("Indent List", "Tab")
export const outdentList = makeKeyMapWithCommon("Outdent List", "Shift-Tab")
export const redo = makeKeymap("Redo", "Ctrl-y", "Cmd-Shift-z")
export const redoBarred = makeKeymap("Redo Barred", "Ctrl-Shift-z", "Cmd-y")
export const openHelp = makeKeyMapWithCommon("Open Help", "Mod-/")
export const addLink = makeKeyMapWithCommon("Link", "Mod-k")
export const submit = makeKeyMapWithCommon("Submit Content", "Mod-Enter")
export const enter = makeKeyMapWithCommon("Enter", "Enter")
export const tab = makeKeyMapWithCommon("Tab", "Tab")
export const indent = makeKeyMapWithCommon("Indent", "Tab")
export const outdent = makeKeyMapWithCommon("Outdent", "Shift-Tab")
export const backspace = makeKeyMapWithCommon("Backspace", "Backspace")
export const deleteKey = makeKeyMapWithCommon("Delete", "Delete")
export const space = makeKeyMapWithCommon("Space", "Space")
export const escape = makeKeyMapWithCommon("Escape", "Escape")
export const nextCell = makeKeyMapWithCommon("Next cell", "Tab")
export const previousCell = makeKeyMapWithCommon("Previous cell", "Shift-Tab")
export const toggleTable = makeKeyMapWithCommon("Table", "Shift-Alt-t")
export const addRowBefore = makeKeyMapWithCommon("Add Row Above", "Ctrl-Alt-ArrowUp")
export const addRowAfter = makeKeyMapWithCommon("Add Row Below", "Ctrl-Alt-ArrowDown")
export const addColumnAfter = makeKeyMapWithCommon("Add Column After", "Ctrl-Alt-ArrowRight")
export const addColumnBefore = makeKeyMapWithCommon("Add Column Before", "Ctrl-Alt-ArrowLeft")
export const cut = makeKeyMapWithCommon("Cut", "Mod-x")
export const copy = makeKeyMapWithCommon("Copy", "Mod-c")
export const paste = makeKeyMapWithCommon("Paste", "Mod-v")
export const altPaste = makeKeyMapWithCommon("Paste", "Mod-Shift-v")

const arrowKeysMap = {
    // for reference: https://wincent.com/wiki/Unicode_representations_of_modifier_keys
    ARROWLEFT: "\u2190",
    ARROWRIGHT: "\u2192",
    ARROWUP: "\u2191",
    ARROWDOWN: "\u2193",
}

export function tooltip(keymap: Keymap | undefined, description?: string): string | undefined {
    if (keymap) {
        let shortcut: string
        if (browser.mac) {
            // for reference: https://wincent.com/wiki/Unicode_representations_of_modifier_keys
            shortcut = keymap.mac
                .replace(/Cmd/i, "\u2318")
                .replace(/Shift/i, "\u21E7")
                .replace(/Ctrl/i, "\u2303")
                .replace(/Alt/i, "\u2325")
        } else {
            shortcut = keymap.windows
        }
        const keys = shortcut.split("-")
        const lastKey = keys[keys.length - 1].toUpperCase()
        keys[keys.length - 1] = arrowKeysMap[lastKey] || lastKey
        shortcut = keys.join(browser.mac ? "" : "+")
        return description ? `${description} ${shortcut}` : shortcut
    }
}

export function findKeymapByDescription(description: string): Keymap | undefined {
    const matches = ALL.filter(
        keymap => keymap.description.toUpperCase() === description.toUpperCase(),
    )
    return matches[0]
}

export function findShortcutByDescription(description: string): string | undefined {
    const keymap = findKeymapByDescription(description)
    if (keymap) {
        return findShortcutByKeymap(keymap)
    }
}

export function findShortcutByKeymap(keymap: Keymap): string | undefined {
    if (browser.mac) {
        return keymap.mac
    }

    return keymap.windows
}

const ALL = [
    toggleOrderedList,
    toggleBulletList,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrikethrough,
    toggleCode,
    setNormalText,
    toggleHeading1,
    toggleHeading2,
    toggleHeading3,
    toggleHeading4,
    toggleHeading5,
    toggleBlockQuote,
    insertNewLine,
    insertRule,
    splitCodeBlock,
    splitListItem,
    redo,
    undo,
]

function makeKeymap(description: string, windows: string, mac: string, common?: string): Keymap {
    return {
        description: description,
        windows: windows,
        mac: mac,
        common: common,
    }
}

function makeKeyMapWithCommon(description: string, common: string): Keymap {
    const windows = common.replace(/Mod/i, "Ctrl")
    const mac = common.replace(/Mod/i, "Cmd")
    return makeKeymap(description, windows, mac, common)
}

export interface Keymap {
    description: string
    windows: string
    mac: string
    common?: string
}

export function bindKeymapWithCommand(
    shortcut: string,
    cmd: Command,
    keymap: { [key: string]: Function },
) {
    const oldCmd = keymap[shortcut]
    let newCmd = cmd
    if (keymap[shortcut]) {
        newCmd = (state, dispatch, editorView) => {
            return oldCmd(state, dispatch) || cmd(state, dispatch, editorView)
        }
    }
    keymap[shortcut] = newCmd
}

export function findKeyMapForBrowser(kayMap: Keymap): string | undefined {
    if (kayMap) {
        if (browser.mac) {
            return kayMap.mac
        }

        return kayMap.windows
    }
}

export const LEFT = 37
export const RIGHT = 39
export const UP = 38
export const DOWN = 40
