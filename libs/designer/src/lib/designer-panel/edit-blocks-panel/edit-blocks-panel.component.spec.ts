import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditBlocksPanelComponent } from "./edit-blocks-panel.component"

describe("EditBlocksPanelComponent", () => {
    let component: EditBlocksPanelComponent
    let fixture: ComponentFixture<EditBlocksPanelComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditBlocksPanelComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditBlocksPanelComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
