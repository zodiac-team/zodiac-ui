import { Injectable, Injector, Optional, SkipSelf } from "@angular/core"
import { EditorView } from "prosemirror-view"
import { EditorState, Plugin, PluginKey } from "prosemirror-state"
import { createState } from "./utils/create-state"
import { createView } from "./utils/create-view"
import { Editor, EditorEvent } from "./interfaces"
import { Observable, ReplaySubject, Subject } from "rxjs"
import { createDispatch, createDispatchTransaction } from "./utils/create-dispatch-transaction"
import { createSchema } from "./utils/create-schema"
import { EditorConfig, provideEditorConfig } from "./utils/create-config"
import { NODE_VIEW_FACTORY_PROVIDER } from "./utils/create-node-view"
import { Command } from "../../../../editor/src/lib/interfaces/command"
import { createPluginInjector, createPlugins } from "./utils/create-plugins"
import { EventDispatcher } from "../../../../editor/src/lib/interfaces/editor-config"
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators"
import { Schema } from "prosemirror-model"

export function provideEditor() {
    return [NODE_VIEW_FACTORY_PROVIDER, EditorService, provideEditorConfig()]
}

const keyNotFound: PluginKey = {
    get() {
        return null
    },
    getState(state?) {
        return null
    },
}

@Injectable()
export class EditorService implements Editor {
    public view: EditorView
    public state: EditorState
    public viewChange: Subject<EditorEvent>
    public stateChange: ReplaySubject<EditorEvent>

    private injector: Injector
    private schema: Schema
    private plugins: Plugin[]

    private readonly config: EditorConfig
    private readonly parentInjector: Injector
    private readonly parent: EditorService

    constructor(
        config: EditorConfig,
        injector: Injector,
        @SkipSelf() @Optional() parent: EditorService,
    ) {
        this.config = config
        this.viewChange = new Subject()
        this.stateChange = new ReplaySubject(1)
        this.parent = parent
        this.parentInjector = injector
    }

    public create(mount: HTMLElement, jsonOrNode: Node | any) {
        if (this.view) {
            return
        }
        const {
            nodes,
            marks,
            options: { topNode },
            pluginOptions,
            pluginProviders,
        } = this.config
        const schema = createSchema(nodes, marks, topNode)
        const eventDispatcher = new EventDispatcher()
        const doc = jsonOrNode || this.config.options.defaultState
        const dispatchTransaction = createDispatchTransaction(this)
        const injector = createPluginInjector(pluginProviders, this.parentInjector, {
            schema,
            dispatch: createDispatch(eventDispatcher),
            pluginOptions,
        })
        const plugins = createPlugins(pluginProviders, injector)

        const state = createState(schema, doc, plugins)

        this.injector = injector
        this.state = state
        this.schema = schema
        this.plugins = plugins
        this.view = createView(mount, state, dispatchTransaction)
        this.viewChange.next(this)
        this.stateChange.next(this)
    }

    runCommand(command: Command) {
        return command(this.state, this.view.dispatch, this.view)
    }

    focus() {
        this.view.focus()
    }

    getPluginState<T = any>(key: PluginKey<T>): Observable<T> {
        return this.stateChange.pipe(
            map(({ state }) => {
                return key.getState(state)
            }),
            distinctUntilChanged(),
            shareReplay(1),
        )
    }

    updateState(state) {
        if (this.view) {
            this.state = createState(this.schema, state, this.plugins)
            this.view.updateState(this.state)
        }
    }
}
