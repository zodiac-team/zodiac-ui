import { async, TestBed } from "@angular/core/testing"
import { BlogModule } from "./blog.module"

describe("BlogModule", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BlogModule],
        }).compileComponents()
    }))

    it("should create", () => {
        expect(BlogModule).toBeDefined()
    })
})
