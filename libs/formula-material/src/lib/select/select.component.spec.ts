import { TestBed } from "@angular/core/testing"

import { SelectComponent } from "./select.component"
import { configureAnimations, configureFormulaContext, configureTestModule } from "../../test/utils"
import { SelectModule } from "./select.module"

describe("SelectComponent", () => {
    beforeEach(configureFormulaContext())

    beforeEach(configureTestModule(SelectModule))

    beforeEach(configureAnimations())

    it("should create", async () => {
        await TestBed.compileComponents()
        const fixture = TestBed.createComponent(SelectComponent)

        fixture.detectChanges()

        expect(fixture.componentInstance).toBeTruthy()
        expect(fixture.componentInstance).toMatchSnapshot()
    })
})
