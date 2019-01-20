import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from "@angular/core"
import { Store } from "./store.service"
import { StoreContext } from "./interfaces"
import { Subscription } from "rxjs"

@Directive({
    selector: "[zStore][zStoreIn]",
})
export class StoreDirective<T> implements OnChanges, OnDestroy {
    @Input()
    public zStoreIn: Store<T>

    private readonly vcr: ViewContainerRef
    private readonly tpl: TemplateRef<any>
    private readonly cdr: ChangeDetectorRef
    private sub: Subscription

    constructor(vcr: ViewContainerRef, tpl: TemplateRef<StoreContext<T>>, cdr: ChangeDetectorRef) {
        this.vcr = vcr
        this.tpl = tpl
        this.cdr = cdr
    }

    public ngOnChanges(changes) {
        const store = this.zStoreIn
        if (this.vcr.length) {
            this.vcr.clear()
        }
        if (this.sub) {
            this.sub.unsubscribe()
        }
        if (store) {
            this.vcr.createEmbeddedView(this.tpl, {
                get $implicit() {
                    return store.state
                },
            })

            this.sub = store.subscribe(() => this.cdr.markForCheck())
        }
    }

    public ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe()
        }
        this.vcr.clear()
    }
}
