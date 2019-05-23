import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EmphasisToolComponent } from "./emphasis-tool.component"

describe("EmphasisToolComponent", () => {
    let component: EmphasisToolComponent
    let fixture: ComponentFixture<EmphasisToolComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmphasisToolComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EmphasisToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
