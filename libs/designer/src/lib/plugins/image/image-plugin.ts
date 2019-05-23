import { Selection, PluginKey, StateField, Transaction } from "prosemirror-state"
import { Node, NodeType } from "prosemirror-model"
import { createEditorPlugin } from "../../editor/utils/create-plugins"
import { IMAGE_PLUGIN_KEY } from "./constants"
import { EDITOR_CONTEXT } from "../../editor/constants"
import { EditorContext } from "../../editor/interfaces"
import { ImagePluginState } from "./interfaces"
import { findSelectedNodeOfType } from "prosemirror-utils"

const createStateField = (
    pluginKey: PluginKey,
    cx: EditorContext,
): StateField<ImagePluginState> => ({
    init(config, instance) {
        return {
            selected: false,
            attrs: {},
        }
    },
    apply(tr, state, oldState, newState) {
        const { img } = newState.schema.nodes
        const selected = findSelectedNodeOfType(img)(tr.selection)

        if (selected) {
            const node = tr.doc.nodeAt(tr.selection.anchor)

            state.selected = true
            state.attrs = node.attrs
        }

        return state
    },
})

export const IMAGE_PLUGIN = createEditorPlugin({
    provide: IMAGE_PLUGIN_KEY,
    useFactory: (pluginKey, context) => ({
        state: createStateField(pluginKey, context),
    }),
    deps: [IMAGE_PLUGIN_KEY, EDITOR_CONTEXT],
})
