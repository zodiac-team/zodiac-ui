import { InjectionToken } from "@angular/core"
import { Feature } from "./interfaces"

export const STORE_FEATURE = new InjectionToken<Feature>("STORE_FEATURE")
export const STORE_INITIAL_STATE = new InjectionToken<any>("STORE_FEATURE")
export const STORE_EFFECTS = new InjectionToken<any>("STORE_EFFECTS")
export const STORE_ACTIONS_OBSERVER = new InjectionToken<any>("STORE_ACTIONS_OBSERVER")
export const STORE_EFFECTS_OBSERVER = new InjectionToken<any>("STORE_EFFECTS_OBSERVER")
