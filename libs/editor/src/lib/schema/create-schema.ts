import { MarkSpec, NodeSpec, Schema } from "prosemirror-model"
import { sanitizeNodes } from "../editor.component"
import { text } from "../nodes/text"
import { doc } from "../nodes/doc"
import { paragraph } from "../nodes/paragraph"
import { alignment } from "../../plugins/alignment/schema"

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
    { name: 'doc', spec: doc },
    { name: 'paragraph', spec: paragraph },
    { name: 'text', spec: text },
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

/**
 * Creates a schema preserving order of marks and nodes.
 */
export function createSchema(config: SchemaConfig): Schema {
    const { customNodeSpecs, customMarkSpecs } = config;
    const nodesConfig = Object.keys(customNodeSpecs || {}).concat(config.nodes);
    const marksConfig = Object.keys(customMarkSpecs || {})
        .concat(config.marks || [])
        .concat(markGroupDeclarationsNames);

    let nodes = addItems(nodesInOrder, nodesConfig, customNodeSpecs);
    const marks = addItems(marksInOrder, marksConfig, customMarkSpecs);
    nodes = sanitizeNodes(nodes, marks);
    return new Schema<string, string>({
        nodes,
        marks,
    });
}
