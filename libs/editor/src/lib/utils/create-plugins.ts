import { Dispatch, EditorConfig, EventDispatcher } from "../interfaces/editor-config"
import { Schema } from "prosemirror-model"
import { Plugin } from "prosemirror-state"

export function createPMPlugins({
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
