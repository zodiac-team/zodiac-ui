import { keymap } from "prosemirror-keymap"
import {
    bindKeymapWithCommand,
    findKeyMapForBrowser,
    toggleStrikethrough as key,
} from "../../../lib/keymaps/keymap"
import { toggleStrike } from "./strike.command"

export function strikeKeymap() {
    const bindings = {}

    bindKeymapWithCommand(findKeyMapForBrowser(key), toggleStrike(), bindings)

    return keymap(bindings)
}
