import { keymap } from "prosemirror-keymap"
import { Schema } from "prosemirror-model"
import { Plugin } from "prosemirror-state"
import { insertRule as insertRuleCmd } from "../horizontal-rule.command"
import { bindKeymapWithCommand, insertRule, escape } from "../../../lib/keymaps/keymap"

export function horizontalRuleKeymapPlugin(schema: Schema): Plugin {
    const list = {}

    bindKeymapWithCommand(insertRule.common, insertRuleCmd(), list)

    bindKeymapWithCommand(
        escape.common,
        (state: any, dispatch) => {
            return true
        },
        list,
    )

    return keymap(list)
}
