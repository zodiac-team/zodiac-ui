import { createPlugins, createEditorPlugin } from "../../editor/utils/create-plugins"
import { BodyComponent } from "./body.component"
import { PluginKey } from "prosemirror-state"
import { CreateNodeViewFactory } from "../../interfaces"
import { EditorPlugin, EditorPluginProvider } from "../../editor/interfaces"
import { NODE_VIEW_FACTORY } from "../../editor/utils/create-node-view"
import { BODY_KEY } from "./constants"

export const BODY_PLUGIN = createEditorPlugin({
    provide: BODY_KEY,
    useFactory: (createNodeView: CreateNodeViewFactory) => ({
        props: {
            nodeViews: {
                body_disabled: createNodeView(BodyComponent),
            },
        },
    }),
    deps: [NODE_VIEW_FACTORY],
})
