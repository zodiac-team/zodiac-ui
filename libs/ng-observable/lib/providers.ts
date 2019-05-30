import { STATE_CHANGE_STRATEGY, StateChangeStrategy } from "./constants"

export function useStateChangeStrategy(strategy: StateChangeStrategy) {
    return {
        provide: STATE_CHANGE_STRATEGY,
        useValue: strategy,
    }
}
