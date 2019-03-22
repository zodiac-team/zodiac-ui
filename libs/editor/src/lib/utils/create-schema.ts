import { MarkSpec, NodeSpec, Schema } from "prosemirror-model"
import { docNode } from "../../plugins/doc/doc.node"
import { paragraphNode } from "../../plugins/paragraph/paragraph.node"
import { alignment } from "../../plugins/alignment/alignment.mark"
import { sanitizeNodes } from "./sanitize"
import { EditorConfig } from "../interfaces/editor-config"
import { textNode } from "../../plugins/text/text.node"

export interface SchemaConfig {
    nodes: string[];
    customNodeSpecs?: SchemaCustomNodeSpecs;
    marks?: string[];
    customMarkSpecs?: SchemaCustomMarkSpecs;
}

export interface SchemaBuiltInItem {
    name: string;
    spec: NodeSpec | MarkSpec;
}

export interface SchemaCustomNodeSpecs {
    [name: string]: NodeSpec;
}

export interface SchemaCustomMarkSpecs {
    [name: string]: MarkSpec;
}

const nodesInOrder: SchemaBuiltInItem[] = [
    { name: 'doc', spec: docNode },
    { name: 'paragraph', spec: paragraphNode },
    { name: 'text', spec: textNode },
];

const marksInOrder: SchemaBuiltInItem[] = [
    { name: 'alignment', spec: alignment },
];

const markGroupDeclarations = [
    // groupDeclaration(COLOR),
    // groupDeclaration(FONT_STYLE),
    // groupDeclaration(SEARCH_QUERY),
    // groupDeclaration(LINK),
];

const markGroupDeclarationsNames = markGroupDeclarations.map(
    groupMark => groupMark.name,
);

function addItems(
    builtInItems: SchemaBuiltInItem[],
    config: string[],
    customSpecs: SchemaCustomNodeSpecs | SchemaCustomMarkSpecs = {},
) {
    if (!config) {
        return {};
    }

    /**
     * Add built-in Node / Mark specs
     */
    const items = builtInItems.reduce<Record<string, NodeSpec | MarkSpec>>(
        (items, { name, spec }) => {
            if (config.indexOf(name) !== -1) {
                items[name] = customSpecs[name] || spec;
            }

            return items;
        },
        {},
    );

    /**
     * Add Custom Node / Mark specs
     */
    return Object.keys(customSpecs).reduce((items, name) => {
        if (items[name]) {
            return items;
        }

        items[name] = customSpecs[name];

        return items;
    }, items);
}

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
    return a.rank - b.rank;
}

function sortByOrder(item: 'plugins' | 'nodes' | 'marks') {
    // return function(a: { name: string }, b: { name: string }): number {
    //     return Ranks[item].indexOf(a.name) - Ranks[item].indexOf(b.name);
    // };

    return () => 0
}

export function fixExcludes(marks: {
    [key: string]: MarkSpec;
}): { [key: string]: MarkSpec } {
    const markKeys = Object.keys(marks);
    const markGroups = new Set(markKeys.map(mark => marks[mark].group));

    markKeys.map(markKey => {
        const mark = marks[markKey];
        if (mark.excludes) {
            mark.excludes = mark.excludes
                .split(' ')
                .filter(group => markGroups.has(group))
                .join(' ');
        }
    });
    return marks;
}

export function createSchema(editorConfig: EditorConfig) {
    const marks = fixExcludes(
        editorConfig.marks.sort(sortByOrder('marks')).reduce(
            (acc, mark) => {
                acc[mark.name] = mark.mark;
                return acc;
            },
            {} as { [nodeName: string]: MarkSpec },
        ),
    );
    const nodes = sanitizeNodes(
        editorConfig.nodes.sort(sortByOrder('nodes')).reduce(
            (acc, node) => {
                acc[node.name] = node.node;
                return acc;
            },
            {} as { [nodeName: string]: NodeSpec },
        ),
        marks,
    );

    return new Schema({ nodes, marks });
}
