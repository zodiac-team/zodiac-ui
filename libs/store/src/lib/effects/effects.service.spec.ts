import { provideEffects } from "./effects.module"
import { STORE_EFFECTS_OBSERVER } from "../constants"
import { of, Subject } from "rxjs"
import { createConnector, EffectsService, StoreEffects } from "./effects.service"
import { async, TestBed } from "@angular/core/testing"

function createTestEffectsModule(effects) {
    return TestBed.configureTestingModule({
        providers: [
            StoreEffects,
            provideEffects(effects),
            {
                provide: STORE_EFFECTS_OBSERVER,
                useClass: Subject,
            },
        ],
    })
}

function createTestEffects(Context, ...effects) {
    const connect = createConnector()

    effects.forEach(effect => connect(effect))

    return class FakeEffects extends Context {
        static connect = connect
    }
}

class EmptyContext {}

describe("EffectsService", () => {
    it("should be created", () => {
        const effects = createTestEffects(EmptyContext, () => of(true))
        const subject = createTestEffectsModule([effects])

        expect(subject.get(EffectsService)).toBeInstanceOf(EffectsService)
    })

    it("should run effects", async(() => {
        const result = () => of(true)
        const effects = createTestEffects(EmptyContext, result)
        const module = createTestEffectsModule([effects])
        const subject = module.get(EffectsService)
        const spy = jest.fn()
        const sub = subject.subscribe(spy)

        subject.runEffects()

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({
            source: result,
            value: true,
        })
        expect(sub.closed).toBe(true)
    }))
})
