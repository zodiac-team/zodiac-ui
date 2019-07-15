import { InjectionToken } from "@angular/core"

export const traceSymbol = Symbol("trace action dispatcher")

export const INITIAL_STATE = new InjectionToken("INITIAL_STATE")
export const FEATURE = new InjectionToken("FEATURE")
