import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    OnInit,
    ViewChild,
} from "@angular/core"

import { EditorState, Plugin, PluginKey, Transaction } from "prosemirror-state"
import { EditorProps, EditorView } from "prosemirror-view"
import { Editor } from "./interfaces"
import { Schema, Node, MarkSpec, NodeSpec } from "prosemirror-model"
import { schema as schemaBasic } from "prosemirror-schema-basic"
import { EditorPlugin, PluginsOptions } from "./interfaces/editor-plugin"
import { EDITOR_PLUGIN } from "./constants"
import { Dispatch, EditorConfig, EventDispatcher } from "./interfaces/editor-config"
import { changeAlignment } from "../plugins/alignment/commands"
import { findChangedNodesFromTransaction, validateNodes } from "./utils/nodes"
import { getDocStructure } from "./utils/document"
import { doc } from "./nodes/doc"
import { paragraph } from "./nodes/paragraph"
import { text } from "./nodes/text"


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

function isContentSupported(
    nodes: { [key: string]: NodeSpec },
    contentKey: string,
): boolean {
    const nodeKeys = Object.keys(nodes);

    // content is with valid node
    if (nodeKeys.indexOf(contentKey) > -1) {
        return true;
    }

    // content is with valid group
    // tslint:disable-next-line
    for (const supportedKey in nodes) {
        const nodeSpec = nodes[supportedKey];
        if (nodeSpec && nodeSpec.group === contentKey) {
            return true;
        }
    }

    return false;
}

function sanitizedContent(
    content: string | undefined,
    invalidContent: string,
): string {
    if (!invalidContent.length) {
        return content || '';
    }

    if (!content || !content.match(/\w/)) {
        return '';
    }

    const newContent = content
        .replace(
            new RegExp(
                `(${invalidContent}((\\s)*\\|)+)|((\\|(\\s)*)+${invalidContent})|(${invalidContent}$)`,
                'g',
            ),
            '',
        )
        .replace('  ', ' ')
        .trim();

    return newContent;
}

export function sanitizeNodes(
    nodes: { [key: string]: NodeSpec },
    supportedMarks: { [key: string]: MarkSpec },
): { [key: string]: NodeSpec } {
    const nodeNames = Object.keys(nodes);
    nodeNames.forEach(nodeKey => {
        const nodeSpec = { ...nodes[nodeKey] };
        if (nodeSpec.marks && nodeSpec.marks !== '_') {
            nodeSpec.marks = nodeSpec.marks
                .split(' ')
                .filter(mark => !!supportedMarks[mark])
                .join(' ');
        }
        if (nodeSpec.content) {
            const content = nodeSpec.content.replace(/\W/g, ' ');
            const contentKeys = content.split(' ');
            const unsupportedContentKeys = contentKeys.filter(
                contentKey => !isContentSupported(nodes, contentKey),
            );
            nodeSpec.content = unsupportedContentKeys.reduce(
                (newContent, nodeName) => sanitizedContent(newContent, nodeName),
                nodeSpec.content,
            );
        }
        nodes[nodeKey] = nodeSpec;
    });
    return nodes;
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
/**
* Creates a dispatch function that can be called inside ProseMirror Plugin
* to notify listeners about that plugin's state change.
*/
export function createDispatch<T>(
    eventDispatcher: EventDispatcher<T>,
): Dispatch<T> {
    return (eventName: PluginKey | string, data: T) => {
        if (!eventName) {
            throw new Error('event name is required!');
        }

        const event =
            typeof eventName === 'string'
                ? eventName
                : (eventName as PluginKey & { key: string }).key;
        eventDispatcher.emit(event, data);
    };
}

function createConfig(plugins: EditorPlugin[], editorProps: EditorProps) {
    const config: EditorConfig = {
        nodes: [{
            name: 'doc',
            node: doc
        }, {
            name: 'paragraph',
            node: paragraph,
        }, {
            name: 'text',
            node: text
        }],
        marks: [],
        pmPlugins: [],
        // contentComponents: [],
        // primaryToolbarComponents: [],
        // secondaryToolbarComponents: [],
    }

    const pluginsOptions = plugins.reduce(
        (acc, plugin) => {
            if (plugin.pluginsOptions) {
                Object.keys(plugin.pluginsOptions).forEach(pluginName => {
                    if (!acc[pluginName]) {
                        acc[pluginName] = []
                    }
                    acc[pluginName].push(plugin.pluginsOptions[pluginName])
                })
            }

            return acc
        },
        {} as PluginsOptions,
    )

    return plugins.reduce((acc, plugin) => {
        if (plugin.pmPlugins) {
            acc.pmPlugins.push(
                ...plugin.pmPlugins(plugin.name ? pluginsOptions[plugin.name] : undefined),
            )
        }

        if (plugin.nodes) {
            acc.nodes.push(...plugin.nodes(editorProps))
        }

        if (plugin.marks) {
            acc.marks.push(...plugin.marks(editorProps))
        }
        //
        // if (plugin.contentComponent) {
        //     acc.contentComponents.push(plugin.contentComponent);
        // }
        //
        // if (plugin.primaryToolbarComponent) {
        //     acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
        // }
        //
        // if (plugin.secondaryToolbarComponent) {
        //     acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
        // }

        return acc
    }, config)
}

function createPMPlugins({
    editorConfig,
    schema,
    dispatch,
    eventDispatcher,
    // providerFactory,
    // errorReporter,
    // portalProviderAPI,
    // reactContext,
}: {
    editorConfig: EditorConfig
    schema: Schema
    dispatch: Dispatch
    eventDispatcher: EventDispatcher
    // providerFactory: ProviderFactory
    // errorReporter: ErrorReporter
    // portalProviderAPI: PortalProviderAPI
    // reactContext: () => { [key: string]: any }
}): Plugin[] {
    return editorConfig.pmPlugins
        // .sort(sortByOrder("plugins"))
        .map(({ plugin }) =>
            plugin({
                schema,
                dispatch,
                // providerFactory,
                // errorReporter,
                eventDispatcher,
                // portalProviderAPI,
                // reactContext,
            }),
        )
        .filter(plugin => !!plugin)
}

@Component({
    selector: "z-editor",
    template: `
        <button (click)="sendCommand()">Align Right</button>
        <div #editorRef></div>
    `,
    styleUrls: ["./editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, Editor {
    @ViewChild("editorRef")
    public editorRef: ElementRef<HTMLDivElement>
    private state
    private view: EditorView
    private config
    private eventDispatcher: EventDispatcher
    private plugins: EditorPlugin[]

    constructor(@Inject(EDITOR_PLUGIN) plugins: EditorPlugin[]) {
        this.plugins = plugins
    }

    public ngOnInit() {
        this.state = this.createEditorState()
        this.view = this.createEditorView(this.editorRef.nativeElement)
    }

    public sendCommand(command) {
        changeAlignment('end')(this.state, this.view.dispatch)
    }

    private createEditorState() {
        if (this.view) {
            /**
             * There's presently a number of issues with changing the schema of a
             * editor inflight. A significant issue is that we lose the ability
             * to keep track of a user's history as the internal plugin state
             * keeps a list of Steps to undo/redo (which are tied to the schema).
             * Without a good way to do work around this, we prevent this for now.
             */
            // tslint:disable-next-line:no-console
            console.warn("The editor does not support changing the schema dynamically.")
            return this.state
        }

        this.config = createConfig(this.plugins, {})
        const schema = createSchema(this.config)


        // const {
        //     contentTransformerProvider,
        //     defaultValue,
        //     errorReporterHandler,
        // } = options.props.editorProps;
        //
        this.eventDispatcher = new EventDispatcher();
        const dispatch = createDispatch(this.eventDispatcher);
        // const errorReporter = createErrorReporter(errorReporterHandler);

        const plugins = createPMPlugins({
            schema,
            dispatch,
            editorConfig: this.config,
            eventDispatcher: this.eventDispatcher,
        })

        // let doc;
        // if (options.replaceDoc) {
        //     doc =
        //         this.contentTransformer && typeof defaultValue === 'string'
        //             ? this.contentTransformer.parse(defaultValue)
        //             : processRawValue(schema, defaultValue);
        // }
        // let selection: Selection | undefined;
        // if (doc) {
        //     // ED-4759: Don't set selection at end for full-page editor - should be at start
        //     selection =
        //         options.props.editorProps.appearance === 'full-page'
        //             ? Selection.atStart(doc)
        //             : Selection.atEnd(doc);
        // }
        // // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
        // const patchedSelection = selection
        //     ? Selection.findFrom(selection.$head, -1, true) || undefined
        //     : undefined;

        return EditorState.create({
            schema,
            plugins,
            // doc,
            // selection: patchedSelection,
        })
    }

    private createEditorView(node) {
        // Creates the editor-view from this.editorState. If an editor has been mounted
        // previously, this will contain the previous state of the editor.
        return new EditorView(
            { mount: node },
            {
                state: this.state,
                dispatchTransaction: (transaction: Transaction) => {
                    if (!this.view) {
                        return;
                    }

                    const nodes: Node[] = findChangedNodesFromTransaction(transaction);
                    if (validateNodes(nodes)) {
                        // go ahead and update the state now we know the transaction is good
                        const editorState = this.view.state.apply(transaction);
                        this.view.updateState(editorState);
                        // if (this.props.editorProps.onChange && transaction.docChanged) {
                        //     this.props.editorProps.onChange(this.view);
                        // }
                        this.state = editorState;
                    } else {
                        const documents = {
                            new: getDocStructure(transaction.doc),
                            prev: getDocStructure(transaction.docs[0]),
                        };
                        // analyticsService.trackEvent(
                        //     'atlaskit.fabric.editor.invalidtransaction',
                        //     { documents: JSON.stringify(documents) }, // V2 events don't support object properties
                        // );
                        // this.eventDispatcher.emit(analyticsEventKey, {
                        //     payload: {
                        //         action: 'dispatchedInvalidTransaction',
                        //         actionSubject: 'editor',
                        //         eventType: 'operational',
                        //         attributes: {
                        //             analyticsEventPayloads: transaction.getMeta(
                        //                 analyticsPluginKey,
                        //             ),
                        //             documents,
                        //         },
                        //     },
                        // });
                    }
                },
                // Disables the contentEditable attribute of the editor if the editor is disabled
                // editable: state => !this.props.editorProps.disabled,
                attributes: { 'data-gramm': 'false' },
            },
        );
    }
}
