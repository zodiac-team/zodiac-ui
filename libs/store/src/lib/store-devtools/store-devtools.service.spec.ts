import { TestBed } from "@angular/core/testing"

import { StoreDevtoolsService } from "./store-devtools.service"

describe("DevtoolsService", () => {
    beforeEach(() => TestBed.configureTestingModule({}))

    it("should be created", () => {
        const service: StoreDevtoolsService = TestBed.get(StoreDevtoolsService)
        expect(service).toBeTruthy()
    })
})
