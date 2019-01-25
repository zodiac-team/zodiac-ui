import { InputComponent } from "./input.component"
import { configureAnimations, configureFormulaContext, configureTestModule } from "../../test/utils"
import { InputModule } from "./input.module"
import { TestBed } from "@angular/core/testing"

describe("InputComponent", () => {
    beforeEach(configureFormulaContext())

    beforeEach(configureTestModule(InputModule))

    beforeEach(configureAnimations())

    it("should create", async () => {
        await TestBed.compileComponents()
        const fixture = TestBed.createComponent(InputComponent)

        fixture.detectChanges()

        expect(fixture.componentInstance).toBeTruthy()
        expect(fixture.componentInstance).toMatchSnapshot()
    })
})
