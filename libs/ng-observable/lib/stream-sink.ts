import { Injectable, OnDestroy } from "@angular/core"
import { from, Subscription } from "rxjs"
import { Sinkable } from "./interfaces"
import { isTeardownLogic } from "./internals/type-guards"

@Injectable()
export class StreamSink implements OnDestroy {
    private sub: Subscription

    public sinkAll(...sinkables: Sinkable[]) {
        for (const stream of sinkables) {
            this.sink = stream
        }
    }

    constructor() {
        this.sub = new Subscription()
    }

    public set sink(sinkable: Sinkable) {
        if (!sinkable) {
            return
        }
        if (isTeardownLogic(sinkable)) {
            this.sub.add(sinkable)
        } else {
            this.sub.add(
                from(sinkable).subscribe(sub => {
                    this.sub.add(sub)
                }),
            )
        }
    }

    public ngOnDestroy() {
        this.complete()
    }

    public complete(): void {
        this.sub.unsubscribe()
    }
}
