import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { EditorState, Plugin, PluginKey } from "prosemirror-state"
import { alignment } from "./marks"
import { AlignmentPluginState } from "./interfaces"
import { getActiveAlignment} from "./utils"
import { isAlignable } from "./commands"

export const pluginKey = new PluginKey("alignmentPlugin")

export const defaultConfig = {
    align: 'left',
};

export function createInitialPluginState(
    editorState: EditorState,
    pluginConfig: AlignmentPluginState,
): AlignmentPluginState {
    return {
        align: getActiveAlignment(editorState) || pluginConfig.align,
        isEnabled: true,
    };
}

export function createPlugin(dispatch, pluginConfig) {
    return new Plugin({
        key: pluginKey,
        state: {
            init(config, editorState) {
                return createInitialPluginState(editorState, pluginConfig);
            },
            apply(tr, state: AlignmentPluginState, prevState, nextState) {
                const nextPluginState = getActiveAlignment(nextState);
                const isEnabled = isAlignable(nextPluginState)(
                    nextState,
                    /**
                     * NOTE: Stan is already making dispatch optional in another PR.
                     * We can remove this once it's merged.
                     */
                    undefined as any,
                );
                const newState = {
                    ...state,
                    align: nextPluginState,
                    isEnabled,
                };
                if (nextPluginState !== state.align || isEnabled !== state.isEnabled) {
                    dispatch(pluginKey, newState);
                }
                return newState;
            },
        },
    });
}

export const alignmentPlugin: EditorPlugin = {
    name: "alignmentPlugin",

    marks() {
        return [{ name: "alignment", mark: alignment }]
    },

    pmPlugins() {
        return [
            {
                name: "alignmentPlugin",
                plugin: ({ dispatch }) => createPlugin(dispatch, defaultConfig),
            }
        ]
    }
}
