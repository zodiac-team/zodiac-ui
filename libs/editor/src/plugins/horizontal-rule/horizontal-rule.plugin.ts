import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { rule } from "./horizontal-rule.node"
import { horizontalRuleKeymapPlugin } from "./pm-plugins/keymap"
import { horizontalRuleInputRulePlugin } from "./pm-plugins/input-rule"

export const horizontalRulePlugin: EditorPlugin = {
    nodes() {
        return [{
            name: 'rule',
            node: rule
        }]
    },

    pmPlugins() {
        return [
            {
                name: 'ruleInputRule',
                plugin: ({ schema }) => horizontalRuleInputRulePlugin(schema),
            },
            {
                name: 'ruleKeymap',
                plugin: ({ schema }) => horizontalRuleKeymapPlugin(schema),
            },
        ]
    }
}
