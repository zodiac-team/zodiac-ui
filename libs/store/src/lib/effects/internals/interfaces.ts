import { Feature } from "../../interfaces"
import { Store } from "../../store.service"

export interface AddStoreAction {
    type: "ADD"
    payload: {
        feature: Feature
        store: Store<any>
    }
}

export interface RemoveStoreAction {
    type: "REMOVE"
    payload: {
        feature: Feature
    }
}

export interface NextStoreAction {
    type: "NEXT"
    payload: any
}

export type StoreAction = AddStoreAction | RemoveStoreAction | NextStoreAction

export type StoreMap = Map<Feature, Store<any>>
