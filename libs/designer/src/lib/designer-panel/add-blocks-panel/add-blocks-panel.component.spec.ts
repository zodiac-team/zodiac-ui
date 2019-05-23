import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AddBlocksPanelComponent } from "./add-blocks-panel.component"

describe("AddBlocksPanelComponent", () => {
    let component: AddBlocksPanelComponent
    let fixture: ComponentFixture<AddBlocksPanelComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddBlocksPanelComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AddBlocksPanelComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
