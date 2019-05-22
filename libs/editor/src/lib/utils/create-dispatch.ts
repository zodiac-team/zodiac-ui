import { Dispatch, EventDispatcher } from "../interfaces/editor-config"
import { PluginKey } from "prosemirror-state"

/**
 * Creates a dispatch function that can be called inside ProseMirror Plugin
 * to notify listeners about that plugin's state change.
 */
export function createDispatch<T>(eventDispatcher: EventDispatcher<T>): Dispatch<T> {
    return (eventName: PluginKey | string, data: T) => {
        if (!eventName) {
            throw new Error("event name is required!")
        }

        const event =
            typeof eventName === "string"
                ? eventName
                : (eventName as PluginKey & { key: string }).key
        eventDispatcher.emit(event, data)
    }
}
