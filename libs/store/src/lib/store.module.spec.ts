import { async, TestBed } from "@angular/core/testing"
import { StoreModule } from "./store.module"

import { TestBed } from "@angular/core/testing"
import { StoreService } from "./store.service"
import { StoreModule } from "./store.module"

function createTestModuleWithStore(storeModule) {
    return TestBed.configureTestingModule({
        imports: [storeModule],
    })
}

const emptyState = () => ({})

describe("StoreModule", () => {
    it("should import root store", () => {
        expect(() =>
            createTestModuleWithStore(StoreModule.forRoot(emptyState)).compileComponents(),
        ).not.toThrow()
    })

    it("should import feature store", () => {
        expect(() =>
            createTestModuleWithStore(
                StoreModule.forChild("feature", emptyState),
            ).compileComponents(),
        ).not.toThrow()
    })
})
