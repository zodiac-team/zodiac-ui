import {
    BLOCK_QUOTE, CODE_BLOCK,
    HEADING_1,
    HEADING_2,
    HEADING_3,
    HEADING_4,
    HEADING_5,
    HEADING_6,
    NORMAL_TEXT, PANEL,
} from "./interfaces"
import { bindKeymapWithCommand, findShortcutByDescription } from "../../lib/keymaps/keymap"
import { keymap } from "prosemirror-keymap"
import { Command } from "../../lib/interfaces/command"
import { EditorState, Selection, Transaction } from "prosemirror-state"
import { findWrapping } from "prosemirror-transform"
import { Mark, MarkType, Schema } from "prosemirror-model"
import { insertCodeBlock } from "./block-type.command"

export const enum INPUT_METHOD {
    ASCII = 'ascii',
    AUTO = 'auto',
    AUTO_DETECT = 'autoDetect',
    CLIPBOARD = 'clipboard',
    DRAG_AND_DROP = 'dragAndDrop',
    EXTERNAL = 'external',
    FORMATTING = 'autoformatting',
    FLOATING_TB = 'floatingToolbar',
    KEYBOARD = 'keyboard',
    INSERT_MENU = 'insertMenu',
    MANUAL = 'manual',
    PICKER = 'picker',
    PICKER_CLOUD = 'cloudPicker',
    QUICK_INSERT = 'quickInsert',
    SHORTCUT = 'shortcut',
    TOOLBAR = 'toolbar',
    TYPEAHEAD = 'typeAhead',
}

const not = <T>(fn: ((args: T) => boolean)) => (arg: T) => !fn(arg);

export const removeBlockMarks = (
    state: EditorState,
    marks: Array<MarkType | undefined>,
): Transaction | undefined => {
    // tslint:disable-next-line:no-shadowed-variable
    const { selection, schema } = state;
    let { tr } = state;

    // Marks might not exist in Schema
    const marksToRemove = marks.filter(Boolean);
    if (marksToRemove.length === 0) {
        return undefined;
    }

    /** Saves an extra dispatch */
    let blockMarksExists = false;

    const hasMark = (mark: Mark) => marksToRemove.indexOf(mark.type) > -1;
    /**
     * When you need to toggle the selection
     * when another type which does not allow alignment is applied
     */
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
        if (node.type === schema.nodes.paragraph && node.marks.some(hasMark)) {
            blockMarksExists = true;
            const resolvedPos = state.doc.resolve(pos);
            const withoutBlockMarks = node.marks.filter(not(hasMark));
            tr = tr.setNodeMarkup(
                resolvedPos.pos,
                undefined,
                node.attrs,
                withoutBlockMarks,
            );
        }
    });
    return blockMarksExists ? tr : undefined;
};

/**
 * Function will add wrapping node.
 * 1. If currently selected blocks can be wrapped in the warpper type it will wrap them.
 * 2. If current block can not be wrapped inside wrapping block it will create a new block below selection,
 *  and set selection on it.
 */
function wrapSelectionIn(type): Command {
    return function(state: EditorState, dispatch) {
        let { tr } = state;
        const { $from, $to } = state.selection;
        const { paragraph } = state.schema.nodes;
        const { alignment, indentation } = state.schema.marks;

        /** Alignment or Indentation is not valid inside block types */
        const removeAlignTr = removeBlockMarks(state, [alignment, indentation]);
        tr = removeAlignTr || tr;

        const range = $from.blockRange($to) as any;
        const wrapping = range && (findWrapping(range, type) as any);
        if (range && wrapping) {
            tr.wrap(range, wrapping).scrollIntoView();
        } else {
            /** We always want to append a block type */
            tr.replaceRangeWith(
                $to.pos + 1,
                $to.pos + 1,
                type.createAndFill({}, paragraph.create()),
            );
            tr.setSelection(Selection.near(tr.doc.resolve(state.selection.to + 1)));
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}

export function insertBlockType(name: string): Command {
    return function(state, dispatch) {
        const { nodes } = state.schema;

        switch (name) {
            case BLOCK_QUOTE.name:
                if (nodes.paragraph && nodes.blockquote) {
                    return wrapSelectionIn(nodes.blockquote)(state, dispatch);
                }
                break;
            case CODE_BLOCK.name:
                if (nodes.codeBlock) {
                    return insertCodeBlock()(state, dispatch);
                }
                break;
            case PANEL.name:
                if (nodes.panel && nodes.paragraph) {
                    return wrapSelectionIn(nodes.panel)(state, dispatch);
                }
                break;
        }

        return false;
    };
}

export function keymapPlugin(schema: Schema) {
    const list = {}
    const blocks = [
        NORMAL_TEXT,
        HEADING_1,
        HEADING_2,
        HEADING_3,
        HEADING_4,
        HEADING_5,
        HEADING_6,
        BLOCK_QUOTE,
    ]

    blocks.forEach(blockType => {
        if (schema.nodes[blockType.nodeName]) {

            const shortcut = findShortcutByDescription(
                blockType.title.defaultMessage,
            );

            if (shortcut) {
                bindKeymapWithCommand(
                    shortcut,
                    insertBlockType(
                        blockType.name,
                    ),
                    list,
                );
            }
        }
    });

    return keymap(list)
}
