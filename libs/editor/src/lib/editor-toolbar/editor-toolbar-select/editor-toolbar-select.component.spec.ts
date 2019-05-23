import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditorToolbarSelectComponent } from "./editor-toolbar-select.component"

describe("EditorToolbarSelectComponent", () => {
    let component: EditorToolbarSelectComponent
    let fixture: ComponentFixture<EditorToolbarSelectComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorToolbarSelectComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorToolbarSelectComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
