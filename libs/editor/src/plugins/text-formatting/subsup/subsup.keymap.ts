import { keymap } from "prosemirror-keymap"
import {
    bindKeymapWithCommand,
    findKeyMapForBrowser,
    toggleSuperscript as supKey,
    toggleSubscript as subKey,
} from "../../../lib/keymaps/keymap"
import { toggleSubscript, toggleSuperscript } from "./subsup.command"

export function supsubKeymap() {
    const bindings = {}

    bindKeymapWithCommand(findKeyMapForBrowser(supKey), toggleSuperscript(), bindings)

    bindKeymapWithCommand(findKeyMapForBrowser(subKey), toggleSubscript(), bindings)

    return keymap(bindings)
}
