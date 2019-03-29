import { EditorState, Plugin, PluginKey } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { findParentDomRefOfType, findParentNodeOfType } from "prosemirror-utils"
import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { codeBlock } from "./code.node"
import { arrowHandlers, codeBlockFactory } from "./code.nodeview"
import { code } from "./code.mark"

export interface CodeBlockState {
    element?: HTMLElement
    toolbarVisible?: boolean | undefined
    language?: string
}

export const getPluginState = (state: EditorState): CodeBlockState => pluginKey.getState(state)

export const setPluginState = (stateProps: Object) => (
    state: EditorState,
    dispatch: (tr) => void,
): boolean => {
    const pluginState = getPluginState(state)
    dispatch(
        state.tr.setMeta(pluginKey, {
            ...pluginState,
            ...stateProps,
        }),
    )
    return true
}

export type CodeBlockStateSubscriber = (state: CodeBlockState) => any

export const pluginKey = new PluginKey("codeBlockPlugin")

export const createPlugin = ({ dispatch }) =>
    new Plugin({
        state: {
            init(config, state: EditorState): CodeBlockState {
                return {
                    toolbarVisible: false,
                }
            },
            apply(tr, pluginState: CodeBlockState, oldState, newState) {
                const nextPluginState = tr.getMeta(pluginKey)
                if (nextPluginState) {
                    dispatch(pluginKey, nextPluginState)
                    return nextPluginState
                }
                return pluginState
            },
        },
        key: pluginKey,
        view: () => {
            return {
                update: (view: EditorView, prevState: EditorState) => {
                    const {
                        state: {
                            selection,
                            schema: {
                                // tslint:disable-next-line:no-shadowed-variable
                                nodes: { codeBlock },
                            },
                        },
                    } = view
                    const pluginState = getPluginState(view.state)
                    const parentDOM = findParentDomRefOfType(codeBlock, view.domAtPos.bind(view))(
                        selection,
                    )
                    const parent = findParentNodeOfType(codeBlock)(selection)
                    let language

                    if (parent) {
                        language = parent.node.attrs.language
                    }

                    if (parentDOM !== pluginState.element || pluginState.language !== language) {
                        const newState: CodeBlockState = {
                            element: parentDOM as HTMLElement,
                            language,
                            toolbarVisible: !!parent,
                        }
                        setPluginState(newState)(view.state, view.dispatch)
                        return true
                    }

                    /** Plugin dispatch needed to reposition the toolbar */
                    dispatch(pluginKey, {
                        ...pluginState,
                        language
                    })
                },
            }
        },
        props: {
            nodeViews: {
                codeBlock: codeBlockFactory,
            },
            handleDOMEvents: {
                blur(view: EditorView, event) {
                    const pluginState = getPluginState(view.state)
                    if (pluginState.toolbarVisible) {
                        setPluginState({
                            toolbarVisible: false,
                            element: null,
                            language: null
                        })(view.state, view.dispatch)
                        return true
                    }
                    return false
                },
            },
        },
    })

export interface CodeBlockOptions {
    enableKeybindingsForIDE?: boolean
}

export function codeBlockPlugin(options: CodeBlockOptions = {}): EditorPlugin {
    return {
        nodes() {
            return [{ name: "codeBlock", node: codeBlock }]
        },

        marks() {
            return [{
                name: 'code',
                mark: code
            }]
        },

        pmPlugins() {
            return [
                { name: "codeBlock", plugin: createPlugin },
                {
                    name: "codeBlockKeyHandlers",
                    plugin: () => arrowHandlers
                }
                // {
                //     name: "codeBlockIDEKeyBindings",
                //     plugin: () => (options.enableKeybindingsForIDE ? ideUX : undefined),
                // },
                // {
                //     name: "codeBlockKeyMap",
                //     plugin: ({ schema }) => keymap(schema),
                // },
            ]
        },
    }
}
