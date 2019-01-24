import { provideStore, Store } from "./store.service"
import { Injector } from "@angular/core"
import { async, TestBed, TestBedStatic } from "@angular/core/testing"
import { Actions } from "./actions.service"
import { Observable, Subject } from "rxjs"
import { STORE_ACTIONS_OBSERVER } from "./constants"
import objectContaining = jasmine.objectContaining
import { take } from "rxjs/operators"

export const emptyState = () => ({})

export function createTestStoreForRoot(initialState = emptyState) {
    return TestBed.configureTestingModule({
        providers: [
            Actions,
            provideStore("root", initialState),
            {
                provide: STORE_ACTIONS_OBSERVER,
                useClass: Subject,
            },
        ],
    })
}

export function createTestFeatureStore(feature, initialState = emptyState, parent) {
    return Injector.create({
        parent,
        providers: [provideStore(feature, initialState)],
    })
}

describe("StoreService", () => {
    afterEach(() => expect.hasAssertions())

    describe("when the root store is created", () => {
        let injector: TestBedStatic

        const initialState = {
            isInitialised: true,
            computed: () => 1 + 1,
        }
        const computedState = {
            isInitialised: true,
            computed: 2,
        }

        beforeEach(() => {
            injector = createTestStoreForRoot(() => initialState)
        })

        it("should be created", () => {
            const result = injector.get(Store)

            expect(result).toBeInstanceOf(Store)
            expect(result).toBeInstanceOf(Observable)
        })

        it("should initialise the state and calculate computed properties", () => {
            const subject: Store<any> = injector.get(Store)

            expect(subject.state).toEqual(computedState)
        })
    })

    describe("when a feature store is created", () => {
        let parent: TestBedStatic
        let injector: Injector

        const parentState = { isParent: true }
        const featureState = {
            isFeature: true,
            computed: () => 1 + 1,
        }
        const computedState = {
            isFeature: true,
            computed: 2,
        }

        beforeEach(() => {
            parent = createTestStoreForRoot(() => parentState)
            injector = createTestFeatureStore("feature", () => featureState, parent)
        })

        it("should be created", () => {
            const result = injector.get(Store)

            expect(result).toBeInstanceOf(Store)
            expect(result).toBeInstanceOf(Observable)
        })

        it("should initialise the state and calculate computed properties", () => {
            const subject: Store<any> = injector.get(Store)

            expect(subject.state).toEqual(computedState)
        })

        it("should be connected to the parent store", () => {
            const parentStore: Store<any> = parent.get(Store)
            const featureStore: Store<any> = injector.get(Store)

            expect(parentStore.state).toEqual(
                objectContaining({
                    ...parentState,
                    feature: computedState,
                }),
            )
            expect(featureStore.state).toEqual(computedState)
        })
    })

    describe("when the root store is observed", () => {
        let injector: TestBedStatic
        let store: Store<any>

        const initialState = {
            count: 0,
        }

        beforeEach(() => (injector = createTestStoreForRoot(() => initialState)))

        beforeEach(() => (store = injector.get(Store)))

        it("should return the current state when subscribing to the store", async(() => {
            store.subscribe(subject => expect(subject).toEqual(initialState)).unsubscribe()
        }))

        it("should return the current value when subscribing to a value selected from the store", async(() => {
            store
                .select(state => state.count)
                .subscribe(subject => {
                    expect(subject).toBe(0)
                })
                .unsubscribe()
        }))
    })

    describe("when an action is dispatched", () => {
        let injector: TestBedStatic
        let store: Store<any>

        beforeEach(() => (injector = createTestStoreForRoot()))

        beforeEach(() => (store = injector.get(Store)))

        it("should dispatch an action", async(() => {
            const subject: Actions = injector.get(Actions)
            const result = { type: "ACTION" }

            subject.pipe(take(1)).subscribe(action => expect(action).toEqual(result))

            store.dispatch(result)
        }))
    })

    describe("when the root store is updated", () => {
        let injector: TestBedStatic
        let store: Store<any>

        const initialState = { unchanged: {}, count: 0 }

        beforeEach(() => (injector = createTestStoreForRoot(() => initialState)))

        beforeEach(() => (store = injector.get(Store)))

        it("should partially update the state", () => {
            const result = { count: 1 }
            store.setState(result)
            expect(store.state).toEqual(objectContaining(result))
            expect(store.state.unchanged).toBe(initialState.unchanged)
        })

        it("should throw an error when attempting to modify an object created by immer", () => {
            store.setState(state => {
                state.count += 1
            })
            expect(() => (store.state.count = 0)).toThrow()
        })

        it("should not throw an error when attempting to modify an object created by the user", () => {
            store.setState({ count: 0 })
            expect(() => (store.state.count = 1)).not.toThrow()
        })

        it("should apply simultaneous updates in the order they were called", () => {
            store.setState({ count: 2, foo: "bar" })
            store.setState({ count: 1 })

            expect(store.state).toEqual({ unchanged: {}, count: 1, foo: "bar" })
        })
    })

    describe("when the store is destroyed", () => {
        let injector: TestBedStatic
        let store: Store<any>

        const initialState = { unchanged: {}, count: 0 }

        beforeEach(() => (injector = createTestStoreForRoot(() => initialState)))

        beforeEach(() => (store = injector.get(Store)))

        it("should complete any active subscriptions", () => {
            const subject = store.subscribe()
            store.ngOnDestroy()

            expect(subject.closed).toBe(true)
        })
    })
})
