import { NodeSelection, Selection, StateField } from "prosemirror-state"
import { findSelectedNodeOfType } from "prosemirror-utils"
import { createEditorPlugin } from "../editor/utils/create-plugins"
import { Node } from "prosemirror-model"
import { NODE_PANEL_KEY } from "./constants"
import { EDITOR_CONTEXT } from "../editor/constants"

export interface NodePluginState {
    selected: boolean
    node: Node
    selection: Selection
}

const defaultState: NodePluginState = {
    selected: false,
    node: null,
    selection: null,
}

const createStateField = (): StateField<NodePluginState> => ({
    init(config, instance) {
        return defaultState
    },
    apply(tr, state, oldState, newState) {
        let selected: NodeSelection
        let nextState: NodePluginState = state

        if (tr.selection.$anchor.nodeAfter) {
            selected = new NodeSelection(tr.selection.$anchor)
        }

        if (selected) {
            nextState = {
                selected: true,
                node: selected.node,
                selection: tr.selection,
            }
        } else {
            nextState = defaultState
        }

        return nextState
    },
})

export const NODE_PANEL_PLUGIN = createEditorPlugin({
    provide: NODE_PANEL_KEY,
    useFactory: () => ({
        state: createStateField(),
    }),
    deps: [EDITOR_CONTEXT],
})
