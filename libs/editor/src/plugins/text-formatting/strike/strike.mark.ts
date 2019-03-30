import { MarkSpec } from 'prosemirror-model';
import { FONT_STYLE } from "../constants"

/**
 * @name strike_mark
 */
export interface StrikeDefinition {
    type: 'strike';
}

export const strike: MarkSpec = {
    inclusive: true,
    group: FONT_STYLE,
    parseDOM: [
        { tag: 'strike' },
        { tag: 's' },
        { tag: 'del' },
        {
            style: 'text-decoration',
            getAttrs: value => value === 'line-through' && null,
        },
    ],
    toDOM(): [string] {
        return ['s'];
    },
};
