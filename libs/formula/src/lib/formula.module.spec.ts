import { async, TestBed } from "@angular/core/testing"
import { FormulaModule } from "./formula.module"

describe("FormulaModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormulaModule],
        }).compileComponents()
    }))

    it("should create", () => {
        expect(FormulaModule).toBeDefined()
    })
})
