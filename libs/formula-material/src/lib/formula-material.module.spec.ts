import { async, TestBed } from "@angular/core/testing"
import { FormulaMaterialModule } from "./formula-material.module"

describe("FormulaMaterialModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormulaMaterialModule],
        }).compileComponents()
    }))

    it("should create", () => {
        expect(FormulaMaterialModule).toBeDefined()
    })
})
