import { Inject, Injectable } from "@angular/core"
import { Editor } from "./interfaces"
import { EditorView } from "prosemirror-view"
import { EditorState, Transaction } from "prosemirror-state"
import { Node } from "prosemirror-model"
import { findChangedNodesFromTransaction, validateNodes } from "./utils/nodes"
import { EventDispatcher } from "./interfaces/editor-config"
import { createPMPlugins } from "./utils/create-plugins"
import { createSchema } from "./utils/create-schema"
import { createDispatch } from "./utils/create-dispatch"
import { createConfig } from "./utils/create-config"
import { EDITOR_PLUGIN } from "./constants"
import { EditorPlugin } from "./interfaces/editor-plugin"
import { changeAlignment } from "../plugins/alignment/commands"

@Injectable()
export class EditorService implements Editor {
    private state
    private view: EditorView
    private config
    private readonly eventDispatcher
    private readonly plugins

    constructor(@Inject(EDITOR_PLUGIN) plugins: EditorPlugin[]) {
        this.eventDispatcher = new EventDispatcher();
        this.plugins = plugins
    }

    sendCommand(event) {
        changeAlignment('end')(this.state, this.view.dispatch)
    }

    createEditorState(doc) {
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
        const dispatch = createDispatch(this.eventDispatcher);
        const node = Node.fromJSON(schema, doc)
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
            doc: node,
            // selection: patchedSelection,
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
                        // if (this.props.editorProps.onChange && transaction.docChanged) {
                        //     this.props.editorProps.onChange(this.view);
                        // }
                        this.state = editorState;
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
                attributes: { 'data-gramm': 'false' },
            },
        );
    }
}
