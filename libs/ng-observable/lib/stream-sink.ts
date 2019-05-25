import { Injectable, OnDestroy } from "@angular/core"
import { from, merge, Subscription } from "rxjs"
import { Sinkable } from "./interfaces"
import { isTeardownLogic } from "./internals/type-guards"

@Injectable()
export class StreamSink implements OnDestroy {
    private readonly _sub: Subscription

    public sinkAll(...sinkables: Sinkable[]) {
        for (const stream of sinkables) {
            this.sink = stream
        }
    }

    constructor() {
        this._sub = new Subscription()
    }

    public set sink(sinkable: Sinkable | Sinkable[]) {
        if (!sinkable) {
            return
        }
        if (isTeardownLogic(sinkable)) {
            this._sub.add(sinkable)
        } else if (Array.isArray(sinkable)) {
            for (const stream of sinkable) {
                this.sink = stream
            }
        } else {
            this.sink = from(sinkable).subscribe(stream => {
                this.sink = stream
            })
        }
    }

    public ngOnDestroy() {
        this.complete()
    }

    public complete(): void {
        this._sub.unsubscribe()
    }
}
