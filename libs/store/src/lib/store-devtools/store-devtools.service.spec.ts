import { TestBed, async } from "@angular/core/testing"

import { StoreDevtoolsService } from "./store-devtools.service"
import { STORE_DEVTOOLS_EXTENSION } from "./constants"
import { Subject, Observable, Subject } from "rxjs"
import { StoreLike } from "../interfaces"
import { Actions } from "../actions"
import { Store } from "../store.service"

class FakeStore extends Observable<any> implements StoreLike<any> {
    public state = {}
    public dispatch = jest.fn()
    public setState = jest.fn()
    public select = jest.fn()
}

class FakeExtension extends Subject<any> {
    public send = jest.fn()
    public simulateDispatch = action => this.next(action)
}

function createTestDevtoolsModule(extension = null) {
    return TestBed.configureTestingModule({
        providers: [
            StoreDevtoolsService,
            {
                provide: STORE_DEVTOOLS_EXTENSION,
                useValue: extension,
            },
            {
                provide: Actions,
                useValue: new Subject(),
            },
            {
                provide: Store,
                useValue: new FakeStore(),
            },
        ],
    })
}

describe("DevtoolsService", () => {
    it("should be created", () => {
        const module = createTestDevtoolsModule()
        const service: StoreDevtoolsService = module.get(StoreDevtoolsService)
        expect(service).toBeTruthy()
    })

    it("should not error when the extension is not installed", () => {
        const module = createTestDevtoolsModule()
        const service: StoreDevtoolsService = module.get(StoreDevtoolsService)

        expect(() => service.run()).not.toThrow()
    })

    it("should run when the extension is installed", () => {
        const extension = new FakeExtension()
        const module = createTestDevtoolsModule(extension)
        const service: StoreDevtoolsService = module.get(StoreDevtoolsService)

        expect(() => service.run()).not.toThrow()
    })

    it("should receive events from the extension dispatcher", async(() => {
        const extension = new FakeExtension()
        const module = createTestDevtoolsModule(extension)
        const service: StoreDevtoolsService = module.get(StoreDevtoolsService)
        const store = module.get(Store)
        const actions = module.get(Actions)

        service.run()

        extension.simulateDispatch({
            type: "ACTION",
            payload: JSON.stringify({ setState: {} }),
        })

        extension.simulateDispatch({
            type: "ACTION",
            payload: JSON.stringify({ type: "BOGUS" }),
        })

        extension.simulateDispatch({
            type: "DISPATCH",
            state: JSON.stringify({ count: 0 }),
        })

        actions.next({ type: "BOGUS" })
        actions.next({ type: "SET_STATE", payload: {} })

        expect(store.setState).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalled()
        expect(extension.send).toHaveBeenCalled()
    }))
})
