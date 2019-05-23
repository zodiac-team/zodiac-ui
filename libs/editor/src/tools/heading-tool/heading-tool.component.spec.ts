import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { HeadingToolComponent } from "./heading-tool.component"

describe("HeadingToolComponent", () => {
    let component: HeadingToolComponent
    let fixture: ComponentFixture<HeadingToolComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeadingToolComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(HeadingToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
