import { EditorPlugin, PluginsOptions } from "../interfaces/editor-plugin"
import { EditorProps } from "prosemirror-view"
import { EditorConfig } from "../interfaces/editor-config"

export function createConfig(plugins: EditorPlugin[], editorProps: EditorProps) {
    const config: EditorConfig = {
        nodes: [],
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
