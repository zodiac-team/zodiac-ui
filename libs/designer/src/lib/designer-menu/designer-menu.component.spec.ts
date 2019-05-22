import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DesignerMenuComponent } from "./designer-menu.component"

describe("DesignerMenuComponent", () => {
    let component: DesignerMenuComponent
    let fixture: ComponentFixture<DesignerMenuComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DesignerMenuComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DesignerMenuComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
