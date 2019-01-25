import { TestBed } from "@angular/core/testing"

import { TextareaComponent } from "./textarea.component"
import { configureAnimations, configureFormulaContext, configureTestModule } from "../../test/utils"
import { TextareaModule } from "./textarea.module"

describe("TextareaComponent", () => {
    beforeEach(configureFormulaContext())

    beforeEach(configureTestModule(TextareaModule))

    beforeEach(configureAnimations())

    it("should create", async () => {
        await TestBed.compileComponents()
        const fixture = TestBed.createComponent(TextareaComponent)

        fixture.detectChanges()

        expect(fixture.componentInstance).toBeTruthy()
    })
})
