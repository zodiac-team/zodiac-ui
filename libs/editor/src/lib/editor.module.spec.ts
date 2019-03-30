import { async, TestBed } from "@angular/core/testing"
import { EditorModule } from "./editor.module"

describe("EditorModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [EditorModule],
        }).compileComponents()
    }))

    it("should create", () => {
        expect(EditorModule).toBeDefined()
    })
})
