import { Action, ActionFactory, ActionPayload, ActionType, DeepReadonly, StoreSnapshot } from "./interfaces"
import { getChanges, toEnumeratedValue, toPreviousValue } from "./utils"
import { of } from "rxjs"
import { ofAction } from "./operators"

export function storeSnapshot<T extends object>(state: T): StoreSnapshot<T> {
    const value = toEnumeratedValue(state)
    const previousValue = toPreviousValue(state)
    const changes = getChanges(value, previousValue)

    return {
        value,
        previousValue,
        changes,
    }
}

export function action<U extends Action>(
    type: ActionType<U>,
): ActionFactory<ActionType<U>, ActionPayload<U>> {
    function action(payload) {
        return {
            type,
            payload,
        }
    }

    action.type = type

    return action
}
