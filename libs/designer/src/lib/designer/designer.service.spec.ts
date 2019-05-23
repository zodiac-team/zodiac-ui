import { TestBed } from "@angular/core/testing"

import { DesignerService } from "./designer.service"

describe("DesignerService", () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it("should be created", () => {
        const service: DesignerService = TestBed.get(DesignerService)
        expect(service).toBeTruthy()
    })
})
