import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { StrikeToolComponent } from "./strike-tool.component"

describe("StrikeToolComponent", () => {
    let component: StrikeToolComponent
    let fixture: ComponentFixture<StrikeToolComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StrikeToolComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(StrikeToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
