import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { UnderlineToolComponent } from "./underline-tool.component"

describe("UnderlineToolComponent", () => {
    let component: UnderlineToolComponent
    let fixture: ComponentFixture<UnderlineToolComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnderlineToolComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(UnderlineToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
