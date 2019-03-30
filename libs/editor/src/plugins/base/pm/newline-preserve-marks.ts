import { PluginKey, Plugin, EditorState } from 'prosemirror-state';
import { keydownHandler } from 'prosemirror-keymap';
import { filterCommands } from "../../../lib/utils/filter"
// import { typeAheadPluginKey } from '../../../plugins/type-ahead';
// import { emojiPluginKey } from '../../../plugins/emoji/pm-plugins/main';

export const newlinePreserveMarksKey = new PluginKey(
    'newlinePreserveMarksPlugin',
);

const isSelectionEndOfParagraph = (state: EditorState): boolean =>
    state.selection.$to.parent.type === state.schema.nodes.paragraph &&
    state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();

const isSelectionAligned = (state: EditorState): boolean =>
    !!state.selection.$to.parent.marks.find(
        m => m.type === state.schema.marks.alignment,
    );

const isTypeaheadNotDisplaying = (state: EditorState): boolean => true
    // !typeAheadPluginKey.getState(state).active &&
    // !emojiPluginKey.getState(state).queryActive;

const splitBlockPreservingMarks = (state: EditorState, dispatch): boolean => {
    dispatch(state.tr.split(state.tr.mapping.map(state.selection.$from.pos), 1));
    return true;
};

export const newlinePreserveMarksPlugin = () =>
    new Plugin({
        key: newlinePreserveMarksKey,
        props: {
            handleKeyDown: keydownHandler({
                Enter: filterCommands(
                    [
                        isSelectionEndOfParagraph,
                        isSelectionAligned,
                        isTypeaheadNotDisplaying,
                    ],
                    splitBlockPreservingMarks,
                ),
            }),
        },
    });
