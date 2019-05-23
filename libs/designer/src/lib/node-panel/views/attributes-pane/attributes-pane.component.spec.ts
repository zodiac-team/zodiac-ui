import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AttributesPaneComponent } from "./attributes-pane.component"

describe("AttributesPaneComponent", () => {
    let component: AttributesPaneComponent
    let fixture: ComponentFixture<AttributesPaneComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AttributesPaneComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AttributesPaneComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
