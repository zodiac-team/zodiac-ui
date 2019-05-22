import { keymap } from "prosemirror-keymap"
import {
    bindKeymapWithCommand,
    findKeyMapForBrowser,
    toggleItalic as key,
} from "../../../lib/keymaps/keymap"
import { toggleEm } from "./emphasis.command"

export function emphasisKeymap() {
    const bindings = {}

    bindKeymapWithCommand(findKeyMapForBrowser(key), toggleEm(), bindings)

    return keymap(bindings)
}
