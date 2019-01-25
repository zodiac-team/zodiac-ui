import { TestBed } from "@angular/core/testing"
import { AutocompleteComponent } from "./autocomplete.component"
import { configureFormulaContext, configureTestModule } from "../../test/utils"
import { AutocompleteModule } from "./autocomplete.module"

describe("AutocompleteComponent", () => {
    beforeEach(configureFormulaContext())

    beforeEach(configureTestModule(AutocompleteModule))

    it("should create", async () => {
        await TestBed.compileComponents()
        const fixture = TestBed.createComponent(AutocompleteComponent)

        fixture.detectChanges()

        expect(fixture.componentInstance).toBeTruthy()
        expect(fixture.componentInstance).toMatchSnapshot()
    })
})
