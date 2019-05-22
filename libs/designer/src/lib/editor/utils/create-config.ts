import { Dictionary } from "../../interfaces"
import { MarkSpec, NodeSpec } from "prosemirror-model"
import {
    EDITOR_MARKS,
    EDITOR_NODES,
    EDITOR_OPTIONS,
    EDITOR_PLUGIN,
    EDITOR_PLUGIN_OPTIONS,
} from "../constants"
import { Injector, Optional } from "@angular/core"
import { EditorOptions, EditorPluginOptions, EditorPluginProvider } from "../interfaces"

export class EditorConfig {
    constructor(
        public nodes: Dictionary<NodeSpec>,
        public marks: Dictionary<MarkSpec>,
        public pluginProviders: EditorPluginProvider[],
        public options: EditorOptions,
        public pluginOptions: EditorPluginOptions,
    ) {}
}

export function provideEditorConfig() {
    return {
        provide: EditorConfig,
        useFactory: createConfig,
        deps: [
            [Injector],
            [EDITOR_NODES],
            [EDITOR_MARKS, new Optional()],
            [EDITOR_PLUGIN, new Optional()],
            [EDITOR_OPTIONS, new Optional()],
        ],
    }
}

export function provideEditorNodes(nodes: Dictionary<NodeSpec>) {
    return {
        provide: EDITOR_NODES,
        useValue: nodes,
        multi: true,
    }
}

export function provideEditorMarks(nodes: Dictionary<NodeSpec>) {
    return {
        provide: EDITOR_NODES,
        useValue: nodes,
        multi: true,
    }
}

export function providePluginOptions(pluginOptions: any) {
    return {
        provide: EDITOR_PLUGIN_OPTIONS,
        useValue: pluginOptions,
        multi: true,
    }
}

export function collectUnique<T>(arr: Dictionary<T>[], debugString: string): Dictionary<T> {
    return arr.reduce((acc, curr) => {
        Object.keys(curr).forEach(key => {
            if (acc[key]) {
                throw new Error(
                    `The given ${debugString} "${key}" already exists, please check the editor configuration`,
                )
            }

            acc[key] = curr[key]
        })

        return acc
    }, {})
}

export function createConfig(
    injector: Injector,
    nodes: Dictionary<NodeSpec>[],
    marks?: Dictionary<MarkSpec>[],
    pluginProviders?: EditorPluginProvider[],
    options?: Partial<EditorOptions>,
    pluginOptions?: EditorPluginOptions,
): EditorConfig {
    const nodeDict = collectUnique(nodes, "node")
    const markDict = marks ? collectUnique(marks, "mark") : {}

    if (!pluginProviders) {
        pluginProviders = []
    }

    if (!options) {
        options = {}
    }

    if (!options.topNode) {
        options.topNode = "doc"
    }

    if (!options.defaultState) {
        options.defaultState = {
            content: [],
            type: options.topNode,
        }
    }

    if (!pluginOptions) {
        pluginOptions = {}
    }

    return new EditorConfig(nodeDict, markDict, pluginProviders, options, pluginOptions)
}
