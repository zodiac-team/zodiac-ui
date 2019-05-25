import { TestBed } from "@angular/core/testing"

import { StateFactory } from "./state"

describe("StateFactoryService", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [StateFactory],
        }),
    )

    it("should be created", () => {
        const service: StateFactory<any> = TestBed.get(StateFactory)
        expect(service).toBeTruthy()
    })
})
