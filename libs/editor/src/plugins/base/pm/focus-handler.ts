import { PluginKey, Plugin } from "prosemirror-state"
import { Dispatch } from "../../../lib/interfaces/editor-config"

export const focusStateKey = new PluginKey("focusStatePlugin")

export const focusHandlerPlugin = (dispatch: Dispatch) =>
    new Plugin({
        key: focusStateKey,
        state: {
            init: () => true,
            apply: (tr, wasEditorFocused: boolean) => {
                const meta = tr.getMeta(focusStateKey) as boolean
                if (typeof meta === "boolean") {
                    if (meta !== wasEditorFocused) {
                        dispatch(focusStateKey, meta)
                        return meta
                    }
                }
                return wasEditorFocused
            },
        },
        props: {
            handleDOMEvents: {
                click: view => {
                    const isEditorFocused = focusStateKey.getState(view.state)
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, view.hasFocus()))
                    }
                    return false
                },
                focus: view => {
                    const isEditorFocused = focusStateKey.getState(view.state)
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, true))
                    }
                    return false
                },
                blur: view => {
                    const isEditorFocused = focusStateKey.getState(view.state)
                    if (isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, false))
                    }
                    return false
                },
            },
        },
    })
