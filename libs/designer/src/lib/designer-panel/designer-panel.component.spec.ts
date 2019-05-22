import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DesignerPanelComponent } from "./designer-panel.component"

describe("DesignerPanelComponent", () => {
    let component: DesignerPanelComponent
    let fixture: ComponentFixture<DesignerPanelComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DesignerPanelComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DesignerPanelComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
