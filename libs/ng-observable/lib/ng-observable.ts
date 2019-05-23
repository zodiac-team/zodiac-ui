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
import { unsubscribe } from "./utils"


/**
 *
 */
export abstract class NgObservable<Props extends any = any> extends Observable<NgHooksEvent<Props>>
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
        this._stream.sink = stream
    }

    private readonly _stream: StreamSink
    private readonly _eventEmitter: Subject<NgHooksEvent>
    private readonly _features: number

    protected constructor(...flags: number[]) {
        super(subscriber => this._eventEmitter.subscribe(subscriber))

        this._eventEmitter = new Subject()
        this._features = flags.length ? createMask(...flags) : NgObservable.DEFAULT_LIFECYCLE_HOOKS
        this._stream = new StreamSink()
    }

    public ngOnChanges(changes: TypedChanges<any>): void {
        this._emitEvent([ON_CHANGES, changes])
    }

    public ngOnInit(): void {
        this._emitEvent([ON_INIT])
    }

    public ngDoCheck() {
        this._emitEvent([DO_CHECK])
    }

    public ngAfterContentInit() {
        this._emitEvent([AFTER_CONTENT_INIT])
    }

    public ngAfterContentChecked() {
        this._emitEvent([AFTER_CONTENT_CHECKED])
    }

    public ngAfterViewInit() {
        this._emitEvent([AFTER_VIEW_INIT])
    }

    public ngAfterViewChecked() {
        this._emitEvent([AFTER_VIEW_CHECKED])
    }

    public ngOnDestroy() {
        this._emitEvent([ON_DESTROY])
        unsubscribe(this._eventEmitter, this._stream)
    }

    private _emitEvent(event: NgHooksEvent) {
        if (this._features & event[0]) {
            this._eventEmitter.next(event)
        }
    }
}
