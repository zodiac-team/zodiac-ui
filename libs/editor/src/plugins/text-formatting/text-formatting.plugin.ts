import { EditorPlugin } from "../../lib/interfaces/editor-plugin"
import { strong } from "./strong/strong.mark"
import { em } from "./emphasis/emphasis.mark"
import { underline } from "./underline/underline.mark"
import { subsup } from "./subsup/subsup.mark"
import { strike } from "./strike/strike.mark"
import { underlineKeymap } from "./underline/underline.keymap"
import { supsubKeymap } from "./subsup/subsup.keymap"
import { strongKeymap } from "./strong/strong.keymap"
import { strikeKeymap } from "./strike/strike.keymap"
import { emphasisKeymap } from "./emphasis/emphasis.keymap"
import { EditorState, Plugin, PluginKey } from "prosemirror-state"
import { Dispatch } from "../../lib/interfaces/editor-config"
import { TextFormattingState } from "./interfaces"
import { deepEqual, getTextFormattingState } from "./utils"
import { inputRulePlugin } from "./text.formatting.inputrule"

export const TEXT_FORMATTING = "textFormatting"
export const pluginKey = new PluginKey('textFormatting');

export const textFormattingPMPlugin = (dispatch: Dispatch) =>
    new Plugin({
        state: {
            init(config, state: EditorState): TextFormattingState {
                return getTextFormattingState(state);
            },
            apply(
                tr,
                pluginState: TextFormattingState,
                oldState,
                newState,
            ): TextFormattingState {
                const state = getTextFormattingState(newState);
                if (!deepEqual(pluginState, state)) {
                    dispatch(pluginKey, state);
                    return state;
                }
                return pluginState;
            },
        },
        key: pluginKey
    });

export const textFormattingPlugin: EditorPlugin = {
    name: TEXT_FORMATTING,

    marks() {
        return [{
            name: 'strong',
            mark: strong
        }, {
            name: 'em',
            mark: em
        }, {
            name: 'underline',
            mark: underline
        }, {
            name: 'subsup',
            mark: subsup
        }, {
            name: 'strike',
            mark: strike
        }]
    },

    pmPlugins() {
        return [
            {
                name: 'textFormatting',
                plugin: ({ dispatch }) => textFormattingPMPlugin(dispatch),
            },
            {
                name: "underlineKeymap",
                plugin: underlineKeymap
            },{
                name: "strongKeymap",
                plugin: strongKeymap
            },{
                name: "strikeKeymap",
                plugin: strikeKeymap
            },{
                name: "emphasisKeymap",
                plugin: emphasisKeymap
            }, {
                name: "subsupKeymap",
                plugin: supsubKeymap
            }, {
                name: "textFormattingInputRule",
                plugin: ({schema}) => inputRulePlugin(schema)
            }
        ]
    },

}
