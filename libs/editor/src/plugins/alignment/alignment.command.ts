import { AlignmentState } from "./interfaces"
import { Command } from "../../lib/interfaces/command"
import { toggleBlockMark } from "../../lib/commands/toggle-block-mark"
import { EditorState } from "prosemirror-state"

export const cascadeCommands = (cmds: Array<Command>) => (
    state: EditorState,
    dispatch,
) => {
    const { tr: baseTr } = state;
    let shouldDispatch = false;

    const onDispatchAction = tr => {
        tr.steps.forEach(st => {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };

    cmds.forEach(cmd => {
        cmd(state, onDispatchAction);
    });

    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
};

export const isAlignable = (align?: AlignmentState): Command => (
    state,
    dispatch,
) => {
    const {
        nodes: { paragraph, heading },
        marks: { alignment },
    } = state.schema
    return toggleBlockMark(
        alignment,
        () => (!align ? undefined : align === "start" ? false : { align }),
        [paragraph, heading],
    )(state, dispatch)
}

export const changeAlignment = (align?: AlignmentState): Command => (
    state,
    dispatch,
) => {
    const {
        nodes: { paragraph, heading },
        marks: { alignment },
    } = state.schema;

    return cascadeCommands([
        changeImageAlignment(align),
        toggleBlockMark(
            alignment,
            () => {
                return (!align ? undefined : align === 'start' ? false : { align })
            },
            [paragraph, heading],
        ),
    ])(state, dispatch);
};

export const changeImageAlignment = (align): Command => (state, dispatch) => {
    const { from, to } = state.selection;

    const tr = state.tr;

    state.doc.nodesBetween(from, to, (node, pos, parent) => {
        if (node.type === state.schema.nodes.mediaSingle) {
            tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                layout: align === 'center' ? 'center' : `align-${align}`,
            });
        }
    });

    if (tr.docChanged && dispatch) {
        dispatch(tr.scrollIntoView());
        return true;
    }

    return false;
};
