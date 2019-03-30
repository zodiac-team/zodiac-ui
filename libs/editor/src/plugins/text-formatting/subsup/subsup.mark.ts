import { MarkSpec, Mark } from 'prosemirror-model';
import { FONT_STYLE } from "../constants"

export interface SubSupAttributes {
    type: 'sub' | 'sup';
}

/**
 * @name subsup_mark
 */
export interface SubSupDefinition {
    type: 'subsup';
    attrs: SubSupAttributes;
}

export interface SubSupMark extends Mark {
    attrs: SubSupAttributes;
}

export const subsup: MarkSpec = {
    inclusive: true,
    group: FONT_STYLE,
    attrs: { type: { default: 'sub' } },
    parseDOM: [
        { tag: 'sub', attrs: { type: 'sub' } },
        { tag: 'sup', attrs: { type: 'sup' } },
    ],
    toDOM(mark) {
        return [mark.attrs.type];
    },
};
