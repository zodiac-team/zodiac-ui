import { TestBed } from "@angular/core/testing"

import { DatepickerComponent } from "./datepicker.component"
import {
    configureAnimations,
    configureDateAdapter,
    configureFormulaContext,
    configureTestModule,
} from "../../test/utils"
import { DatepickerModule } from "./datepicker.module"

describe("DatepickerComponent", () => {
    beforeEach(configureFormulaContext())

    beforeEach(configureTestModule(DatepickerModule))

    beforeEach(configureDateAdapter())

    beforeEach(configureAnimations())

    it("should create", async () => {
        await TestBed.compileComponents()
        const fixture = TestBed.createComponent(DatepickerComponent)

        fixture.detectChanges()

        expect(fixture.componentInstance).toBeTruthy()
        expect(fixture.componentInstance).toMatchSnapshot()
    })
})
