import { keymap } from "prosemirror-keymap"
import { bindKeymapWithCommand, findKeyMapForBrowser, toggleUnderline as key } from "../../../lib/keymaps/keymap"
import { toggleUnderline } from "./underline.command"

export function underlineKeymap() {
    const bindings = {}

    bindKeymapWithCommand(
        findKeyMapForBrowser(key),
        toggleUnderline(),
        bindings
    )

    return keymap(bindings)
}
