import { keymap } from "prosemirror-keymap"
import { Schema } from "prosemirror-model"
import { EditorState, Plugin } from "prosemirror-state"
import { queueCards } from "../../card/pm-plugins/actions"
import { INPUT_METHOD } from "../../block-type/keymap"
import { addLink, bindKeymapWithCommand, enter, escape, insertNewLine } from "../../../lib/keymaps/keymap"
import { Command } from "../../../lib/interfaces/command"
import { HyperlinkState, pluginKey } from "./hyperlink"
import { getLinkMatch, Match } from "../utils"
import { hideLinkToolbar, showLinkToolbar } from "../link.commands"

export function createKeymapPlugin(
    schema: Schema
): Plugin | undefined {
    const list = {};

    bindKeymapWithCommand(
        addLink.common,
        showLinkToolbar(INPUT_METHOD.SHORTCUT),
        list,
    );

    bindKeymapWithCommand(
        enter.common,
        mayConvertLastWordToHyperlink,
        list,
    );

    bindKeymapWithCommand(
        insertNewLine.common,
        mayConvertLastWordToHyperlink,
        list,
    );

    bindKeymapWithCommand(
        escape.common,
        (state: EditorState, dispatch, view) => {
            const hyperlinkPlugin = pluginKey.getState(state) as HyperlinkState;
            if (hyperlinkPlugin.activeLinkMark) {
                hideLinkToolbar()(state, dispatch);
                if (view) {
                    view.focus();
                }
                return false;
            }
            return false;
        },
        list,
    );

    return keymap(list);
}

const mayConvertLastWordToHyperlink: Command = (state, dispatch) => {
    const nodeBefore = state.selection.$from.nodeBefore;

    if (!nodeBefore || !nodeBefore.isText) {
        return false;
    }

    const words = nodeBefore.text.split(' ');
    const lastWord = words[words.length - 1];
    const match: Match | null = getLinkMatch(lastWord);

    if (match) {
        const hyperlinkedText = match.raw;
        const start = state.selection.$from.pos - hyperlinkedText.length;
        const end = state.selection.$from.pos;

        if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
            return false;
        }

        const url = match.url;
        const markType = state.schema.mark('link', { href: url });

        const tr = queueCards([
            {
                url,
                pos: start,
                appearance: 'inline',
            },
        ])(state.tr.addMark(start, end, markType));

        if (dispatch) {
            dispatch(tr);
        }
    }
    return false;
};
