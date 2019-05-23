import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { StylesPaneComponent } from "./styles-pane.component"

describe("StylesPaneComponent", () => {
    let component: StylesPaneComponent
    let fixture: ComponentFixture<StylesPaneComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StylesPaneComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(StylesPaneComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
