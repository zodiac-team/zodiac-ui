import { DecorationSet, Decoration } from 'prosemirror-view';
import { ResolvedPos, Node } from 'prosemirror-model';
import { PluginKey, Plugin, EditorState, Transaction } from 'prosemirror-state';

export const ZWSP = '\u200b';

export const inlineCursorTargetStateKey = new PluginKey(
    'inlineCursorTargetPlugin',
);

export const SPECIAL_NODES = ['mention', 'emoji'];

export const isSpecial = (node: Node | null | undefined) => {
    return node && SPECIAL_NODES.indexOf(node.type.name) !== -1;
};

export const findSpecialNodeAfter = ($pos: ResolvedPos, tr: Transaction) => {
    if (isSpecial($pos.nodeAfter)) {
        return $pos.pos + 1;
    }

    const { parentOffset, parent } = $pos;
    const docSize = tr.doc.nodeSize - 2;

    if (parentOffset === parent.content.size && $pos.pos + 1 < docSize - 2) {
        const { nodeAfter } = tr.doc.resolve($pos.pos + 1);
        if (nodeAfter && isSpecial(nodeAfter.firstChild)) {
            return $pos.pos + 2;
        }
    }
};

export const findSpecialNodeBefore = ($pos: ResolvedPos, tr: Transaction) => {
    if (isSpecial($pos.nodeBefore)) {
        return $pos.pos - 1;
    }

    if ($pos.pos === 0) {
        return;
    }

    const { parentOffset } = $pos;

    if (parentOffset === 0) {
        const { nodeBefore } = tr.doc.resolve($pos.pos - 1);
        if (nodeBefore && isSpecial(nodeBefore.firstChild)) {
            return $pos.pos - 2;
        }
    }
};

export const inlineCursorTargetPlugin = () => {
    return new Plugin({
        key: inlineCursorTargetStateKey,

        state: {
            init: () => ({ positions: [] }),
            apply(tr) {
                const { selection } = tr;
                const { $from } = selection;
                const positions = [] as number[];

                const posAfter = findSpecialNodeAfter($from, tr);
                const posBefore = findSpecialNodeBefore($from, tr);

                if (posAfter !== undefined) {
                    positions.push(posAfter);
                }

                if (posBefore !== undefined) {
                    positions.push(posBefore);
                }

                return { positions };
            },
        },

        props: {
            decorations(state: EditorState) {
                const { doc } = state;
                const { positions } = inlineCursorTargetStateKey.getState(state);

                if (positions && positions.length) {
                    const decorations = positions.map(position => {
                        const node = document.createElement('span');
                        node.appendChild(document.createTextNode(ZWSP));
                        return Decoration.widget(position, node, {
                            raw: true,
                            side: -1,
                        } as any);
                    });

                    return DecorationSet.create(doc, decorations);
                }

                return null;
            },
        },
    });
};
