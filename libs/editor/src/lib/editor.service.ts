import { EventEmitter, Inject, Injectable } from "@angular/core"
import { Editor } from "./interfaces"
import { EditorView } from "prosemirror-view"
import { EditorState, Transaction, Selection } from "prosemirror-state"
import { Node } from "prosemirror-model"
import { findChangedNodesFromTransaction, validateNodes } from "./utils/nodes"
import { EventDispatcher } from "./interfaces/editor-config"
import { createPMPlugins } from "./utils/create-plugins"
import { createSchema } from "./utils/create-schema"
import { createDispatch } from "./utils/create-dispatch"
import { createConfig } from "./utils/create-config"
import { EDITOR_PLUGIN } from "./constants"
import { EditorPlugin } from "./interfaces/editor-plugin"
import { EditorTool } from "./editor-toolbar/interfaces"
import { ReplaySubject } from "rxjs"

export const defaultState = {
    content: [],
    type: "doc",
}

@Injectable()
export class EditorService implements Editor {
    private state: EditorState
    private view: EditorView
    private config
    private readonly eventDispatcher
    private readonly plugins

    public viewChange: EventEmitter<any>
    public stateChange: ReplaySubject<any>

    constructor(@Inject(EDITOR_PLUGIN) plugins: EditorPlugin[]) {
        this.eventDispatcher = new EventDispatcher();
        this.viewChange = new EventEmitter()
        this.stateChange = new ReplaySubject()
        this.plugins = plugins
    }

    runTool(tool: EditorTool) {
        tool.run(this.state, this.view.dispatch, this.view)
    }

    updateState(state) {
        if (this.view) {
            this.createEditorState(state)
            this.view.updateState(this.state)
        }
    }

    createEditorState(state) {
        this.config = createConfig(this.plugins, {})
        const schema = createSchema(this.config)
        const dispatch = createDispatch(this.eventDispatcher);
        const doc = Node.fromJSON(schema, state ? state.doc : defaultState)
        const selection = state ? Selection.fromJSON(doc, state.selection) : undefined
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

        this.state = EditorState.create({
            schema,
            plugins,
            doc,
            selection
        })
    }

    createEditorView(node) {
        // Creates the editor-view from this.editorState. If an editor has been mounted
        // previously, this will contain the previous state of the editor.
        this.view = new EditorView(
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
                        if (transaction.docChanged) {
                            this.viewChange.emit({
                                view: this.view,
                                state: editorState
                            });
                        }
                        this.state = editorState;

                        this.stateChange.next({
                            view: this.view,
                            state: this.state
                        })
                    }
                    // else {
                    //     const documents = {
                    //         new: getDocStructure(transaction.doc),
                    //         prev: getDocStructure(transaction.docs[0]),
                    //     };
                    // }
                },
                // Disables the contentEditable attribute of the editor if the editor is disabled
                // editable: state => !this.props.editorProps.disabled,
            },
        );

        this.viewChange.emit({
            view: this.view,
            state: this.state
        });

        this.stateChange.next({
            view: this.view,
            state: this.state
        })
    }
}
