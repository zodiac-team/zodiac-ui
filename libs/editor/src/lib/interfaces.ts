export interface Editor {
    sendCommand(event)
    createEditorState(plugins)
    createEditorView(node)
}
