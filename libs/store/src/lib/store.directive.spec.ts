import { StoreDirective } from "./store.directive"
import { Store } from "./store.service"
import { StoreModule } from "./store.module"
import { Component, NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TestBed } from "@angular/core/testing"

@Component({
    selector: "z-fake",
    template: `
        <pre *zStore="let state; in: store">
            {{ state | json }}
        </pre
        >
    `,
})
export class FakeComponent {
    constructor(public store: Store<any>) {}
}

export function createTestStoreModule(initialState) {
    @NgModule({
        imports: [CommonModule, StoreModule.forRoot(initialState)],
        declarations: [FakeComponent],
    })
    class FakeModule {}

    return TestBed.configureTestingModule({
        imports: [FakeModule],
    })
}

describe("StoreDirective", () => {
    it("should create an instance", () => {
        const directive = new StoreDirective()
        expect(directive).toBeTruthy()
    })

    it("should render the state", async () => {
        const module = createTestStoreModule(() => ({ count: 0 }))
        await module.compileComponents()
        const fixture = module.createComponent(FakeComponent)

        expect(fixture.debugElement.nativeElement).toMatchSnapshot()
    })

    it("should render the new state", async () => {
        const module = createTestStoreModule(() => ({ count: 0 }))
        const store = module.get(Store)
        await module.compileComponents()
        const fixture = module.createComponent(FakeComponent)

        store.setState({ count: 1 })

        fixture.detectChanges()

        store.setState({ count: 2 })

        fixture.detectChanges()

        expect(fixture.debugElement.nativeElement).toMatchSnapshot()
    })

    it("should clear the view container", async () => {
        const module = createTestStoreModule(() => ({ count: 0 }))
        await module.compileComponents()
        const fixture = module.createComponent(FakeComponent)

        fixture.componentInstance.store = null

        fixture.detectChanges()

        expect(fixture.debugElement.nativeElement).toMatchSnapshot()
    })
})
