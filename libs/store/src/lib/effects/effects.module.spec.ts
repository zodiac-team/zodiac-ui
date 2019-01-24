import { TestBed } from "@angular/core/testing"
import { createConnector, EffectsService } from "./effects.service"
import { EffectsModule } from "./effects.module"

function createTestModuleWithEffects(effectsModule) {
    return TestBed.configureTestingModule({
        imports: [effectsModule],
    })
}

class FakeEffects {
    static connect = createConnector()
}

describe("EffectsModule", () => {
    it("should import root effects", () => {
        expect(() =>
            createTestModuleWithEffects(EffectsModule.forRoot([FakeEffects])).compileComponents(),
        ).not.toThrow()
    })

    it("should import feature effects", () => {
        expect(() =>
            createTestModuleWithEffects(EffectsModule.forChild([FakeEffects])).compileComponents(),
        ).not.toThrow()
    })

    it("should run root effects on init", () => {
        const module = createTestModuleWithEffects(EffectsModule.forRoot([FakeEffects]))
        const spy = jest.fn()

        module.overrideProvider(EffectsService, {
            useValue: {
                runEffects: spy,
            },
        })

        expect(() => module.get(EffectsModule)).not.toThrow()
        expect(spy).toHaveBeenCalledTimes(1)
    })
})
