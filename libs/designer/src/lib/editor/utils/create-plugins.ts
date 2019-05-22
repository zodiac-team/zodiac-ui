import {
    EditorContext,
    EditorPlugin,
    EditorPluginProvider,
    isEditorPluginFactoryProvider,
} from "../interfaces"
import { InjectionToken, Injector, Provider } from "@angular/core"
import { Plugin, PluginKey, PluginSpec } from "prosemirror-state"
import { EDITOR_CONTEXT, EDITOR_PLUGIN } from "../constants"

export function createPluginInjector(
    pluginProviders: EditorPluginProvider[],
    parentInjector: Injector,
    editorProps: EditorContext,
): Injector {
    return Injector.create({
        parent: parentInjector,
        providers: [
            {
                provide: EDITOR_CONTEXT,
                useValue: {
                    ...editorProps,
                },
            },
        ],
    })
}

export function createPluginKey(key): InjectionToken<PluginKey> {
    return new InjectionToken<PluginKey>(key, { factory: () => new PluginKey(key) })
}

export function createPlugins(
    pluginProviders: EditorPluginProvider[],
    injector: Injector,
): EditorPlugin[] {
    return pluginProviders.map(provider => {
        let spec: PluginSpec

        if (isEditorPluginFactoryProvider(provider)) {
            const { deps, useFactory } = provider
            const resolvedDeps = deps ? deps.map(token => injector.get(token)) : []
            spec = useFactory(...resolvedDeps)
        } else {
            spec = provider.useValue
        }

        if (provider.provide) {
            spec.key = injector.get(provider.provide)
        }

        return new Plugin(spec)
    })
}

export function createEditorPlugin(plugin: EditorPluginProvider): Provider[] {
    return [
        {
            provide: EDITOR_PLUGIN,
            useValue: plugin,
            multi: true,
        },
    ]
}
