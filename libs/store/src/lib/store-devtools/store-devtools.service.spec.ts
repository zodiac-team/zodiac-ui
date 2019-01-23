import { TestBed } from "@angular/core/testing"

import { StoreDevtoolsService } from "./store-devtools.service"
import { STORE_DEVTOOLS_EXTENSION } from "./constants"
import { Observable, Subject } from "rxjs"
import { StoreLike } from "../interfaces"
import { Actions } from "../actions.service"
import { Store } from "../store.service"

class FakeStore extends Observable<any> implements StoreLike<any> {
    public state = {}
    public dispatch = jest.fn()
    public setState = jest.fn()
    public select = jest.fn()
}

describe("DevtoolsService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StoreDevtoolsService,
            {
                provide: STORE_DEVTOOLS_EXTENSION,
                useValue: null,
            },
            {
                provide: Actions,
                useValue: new Subject()
            },
            {
                provide: Store,
                useValue: new FakeStore()
            }
        ]
    }))

    it("should be created", () => {
        const service: StoreDevtoolsService = TestBed.get(StoreDevtoolsService)
        expect(service).toBeTruthy()
    })
})
