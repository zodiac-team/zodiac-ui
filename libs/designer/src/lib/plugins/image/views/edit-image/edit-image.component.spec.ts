import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditImageComponent } from "./edit-image.component"

describe("EditImageComponent", () => {
    let component: EditImageComponent
    let fixture: ComponentFixture<EditImageComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditImageComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditImageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
