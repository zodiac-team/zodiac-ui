import { EMPTY, from, Observable, of } from "rxjs"
import { dispatch, ofAction, ofEffect, withLatestState } from "./operators"
import { OfType } from "./utils"
import { async } from "@angular/core/testing"
import { StoreLike } from "./interfaces"
import { catchError, map, mergeMap } from "rxjs/operators"
import { connections, createConnector } from "./effects/effects.service"

@OfType("Fake Action")
class FakeAction {}

class FakeStore extends Observable<any> implements StoreLike<any> {
    public state = {}
    public dispatch = jest.fn()
    public setState = jest.fn()
    public select = jest.fn()
}

describe("operators", () => {
    describe("ofAction", () => {
        const stream = from([{ type: "bogus" }, { type: "Fake Action" }, { type: "bogus" }])

        it("should filter a stream of actions", async(() => {
            const spy = jest.fn()
            const result = { type: "Fake Action" }
            const sub = stream.pipe(
                ofAction(FakeAction)
            ).subscribe(spy)

            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(result)
            expect(sub.closed).toBe(true)
        }))

        it("should throw if it can't determine the action type", () => {
            const spy = jest.fn().mockReturnValue(EMPTY)
            const sub = stream.pipe(
                ofAction({} as any),
                catchError(spy)
            ).subscribe()

            expect(spy).toBeCalledTimes(1)
            expect(sub.closed).toBe(true)
        })
    })

    describe("ofEffect", () => {
        const connect = createConnector()
        const effect = connect(() => of(true))
        const effect2 = connect(() => of(false))
        const stream = from(connect[connections]).pipe(
            mergeMap((fn: () => Observable<any>) =>
                fn().pipe(
                    map((value) => ({
                        source: fn,
                        value
                    }))
                )
            )
        )

        it("should filter a stream of effects", async(() => {
            const spy = jest.fn()
            const sub = stream.pipe(
                ofEffect(effect)
            ).subscribe(spy)

            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(true)
            expect(sub.closed).toBe(true)
        }))
    })

    describe("dispatch", () => {
        const stream = from([0, 1, 2])
        const store = new FakeStore()

        it("should dispatch an action immediately without modifying the stream", async(() => {
            const spy = jest.fn()
            const sub = stream.pipe(
                dispatch(store, new FakeAction())
            ).subscribe(spy)

            expect(spy).toBeCalledTimes(3)
            expect(store.dispatch).toBeCalledTimes(3)
            expect(sub.closed).toBe(true)
        }))
    })

    describe("withLatestState", () => {
        const stream = of(true)
        const store = new FakeStore()

        beforeEach(() => store.state = 1)

        it("should return an array with the store state as the last value", async(() => {
            const spy = jest.fn()
            const sub = stream.pipe(
                withLatestState(store)
            ).subscribe(spy)

            expect(spy).toBeCalledWith([true, 1])
            expect(sub.closed).toBe(true)
        }))
    })
    //
    // describe("setState", () => {
    //     const stream = of(true)
    //     const store = new FakeStore()
    //
    //     beforeEach(() => store.state = 1)
    //
    //     it("should tap the store to set the state immediately", async(() => {
    //         const spy = jest.fn()
    //         const sub = stream.pipe(
    //             withLatestState(store)
    //         ).subscribe(spy)
    //
    //         expect(spy).toBeCalledWith([true, 1])
    //         expect(sub.closed).toBe(true)
    //     }))
    // })
})
