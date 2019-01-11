import { InjectionToken, IterableDiffers, KeyValueDiffers } from "@angular/core"
import { Formula, FormulaOutlet } from "./interfaces"
import { FormulaNode } from "./node/nodes"

export const FORMULA = new InjectionToken<Formula>("FORMULA")
export const FORMULA_DIFFER = new InjectionToken<IterableDiffers | KeyValueDiffers | null>(
    "FORMULA_DIFFER",
)
export const FORMULA_OUTLET = new InjectionToken<FormulaOutlet>("FORMULA_OUTLET")
export const FORMULA_NODE = new InjectionToken<FormulaNode>("FORMULA_NODE")
