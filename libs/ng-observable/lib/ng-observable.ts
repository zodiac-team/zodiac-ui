import {
    AFTER_CONTENT_CHECKED,
    AFTER_CONTENT_INIT,
    AFTER_VIEW_CHECKED,
    AFTER_VIEW_INIT,
    DO_CHECK,
    ON_CHANGES,
    ON_DESTROY,
    ON_INIT,
} from "./constants"

import { NgHooksEvent, Sinkable, TypedChanges } from "./interfaces"
import { Observable, Subject } from "rxjs"
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit,
} from "@angular/core"
import { StreamSink } from "./stream-sink"
import { createMask } from "./internals/create-mask"


/**
 *
 */
export class NgObservable<P extends any = any> extends Observable<NgHooksEvent<P>>
    implements
        OnInit,
        OnChanges,
        DoCheck,
        OnDestroy,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked {
    static DEFAULT_LIFECYCLE_HOOKS = createMask(
        ON_CHANGES,
        ON_INIT,
        AFTER_CONTENT_INIT,
        AFTER_VIEW_INIT,
        ON_DESTROY,
    )

    protected set sink(stream: Sinkable) {
        this.stream.sink = stream
    }

    private readonly stream: StreamSink
    private readonly eventEmitter: Subject<NgHooksEvent>
    private readonly features: number

    constructor(...flags: number[]) {
        super(subscriber => this.eventEmitter.subscribe(subscriber))

        this.eventEmitter = new Subject()
        this.features = flags.length ? createMask(...flags) : NgObservable.DEFAULT_LIFECYCLE_HOOKS
        this.stream = new StreamSink()
    }

    public ngOnChanges(changes: TypedChanges<any>): void {
        this.emitEvent([ON_CHANGES, changes])
    }

    public ngOnInit(): void {
        this.emitEvent([ON_INIT])
    }

    public ngDoCheck() {
        this.emitEvent([DO_CHECK])
    }

    public ngAfterContentInit() {
        this.emitEvent([AFTER_CONTENT_INIT])
    }

    public ngAfterContentChecked() {
        this.emitEvent([AFTER_CONTENT_CHECKED])
    }

    public ngAfterViewInit() {
        this.emitEvent([AFTER_VIEW_INIT])
    }

    public ngAfterViewChecked() {
        this.emitEvent([AFTER_VIEW_CHECKED])
    }

    public ngOnDestroy() {
        this.emitEvent([ON_DESTROY])
        this.eventEmitter.complete()
        this.eventEmitter.unsubscribe()
        this.stream.unsubscribe()
    }

    private emitEvent(event: NgHooksEvent) {
        if (this.features & event[0]) {
            this.eventEmitter.next(event)
        }
    }
}
