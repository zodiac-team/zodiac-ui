import { keymap } from "prosemirror-keymap"
import { bindKeymapWithCommand, findKeyMapForBrowser, toggleBold as key } from "../../../lib/keymaps/keymap"
import { toggleStrong } from "./strong.command"


export function strongKeymap() {
    const bindings = {}

    bindKeymapWithCommand(
        findKeyMapForBrowser(key),
        toggleStrong(),
        bindings
    )

    return keymap(bindings)
}
