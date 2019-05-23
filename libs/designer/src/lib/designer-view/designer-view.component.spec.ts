import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DesignerViewComponent } from "./designer-view.component"

describe("DesignerViewComponent", () => {
    let component: DesignerViewComponent
    let fixture: ComponentFixture<DesignerViewComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DesignerViewComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DesignerViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
