import { InjectionToken } from "@angular/core"
import { StoreDevtoolsConfig } from "./interfaces"

export const STORE_DEVTOOLS_CONFIG = new InjectionToken<StoreDevtoolsConfig>(
    "STORE_DEVTOOLS_CONFIG",
)
export const STORE_DEVTOOLS_EXTENSION = new InjectionToken<any>("STORE_DEVTOOLS_EXTENSION")
