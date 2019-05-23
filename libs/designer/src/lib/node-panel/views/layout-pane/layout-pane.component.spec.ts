import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { LayoutPaneComponent } from "./layout-pane.component"

describe("LayoutPaneComponent", () => {
    let component: LayoutPaneComponent
    let fixture: ComponentFixture<LayoutPaneComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPaneComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPaneComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
