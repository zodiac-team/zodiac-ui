import { EditorProps } from "prosemirror-view"

declare type QuickInsertHandler = any
declare type TypeAheadHandler = any
declare type FloatingToolbarHandler = any
declare type PMPluginFactory = any
declare type NodeConfig = any
declare type MarkConfig = any
declare type UIComponentFactory = any
declare type ToolbarUIComponentFactory = any

export interface PluginsOptions {
    [pluginName: string]: any;
    quickInsert?: QuickInsertHandler;
    typeAhead?: TypeAheadHandler;
    floatingToolbar?: FloatingToolbarHandler;
}

export interface EditorPlugin {
    /**
     * Name of a plugin, that other plugins can use to provide options to it.
     */
    name?: string;

    /**
     * Options that will be passed to a plugin with a corresponding name if it exists and enabled.
     */
    pluginsOptions?: PluginsOptions;

    /**
     * List of ProseMirror-plugins. This is where we define which plugins will be added to EditorView (main-plugin, keybindings, input-rules, etc.).
     */
    pmPlugins?: (
        pluginOptions?: any,
    ) => { name: string; plugin: PMPluginFactory }[];

    /**
     * List of Nodes to add to the schema.
     */
    nodes?: (editorProps: EditorProps) => NodeConfig[];

    /**
     * List of Marks to add to the schema.
     */
    marks?: (editorProps: EditorProps) => MarkConfig[];

    /**
     * Optional UI-component that lives inside the actual content-area (like mention-picker, floating toolbar for links, etc.)
     */
    contentComponent?: UIComponentFactory;

    /**
     * Optional UI-component that will be added to the toolbar at the top of the editor (doesn't exist in the compact-editor).
     */
    primaryToolbarComponent?: ToolbarUIComponentFactory;

    /**
     * Optional UI-component that will be added to the toolbar at the bottom right of the editor. (doesn't exist in the full-page editor)
     * In compact mode this toolbar lives on the right-hand side of the editor.
     */
    secondaryToolbarComponent?: UIComponentFactory;
}
