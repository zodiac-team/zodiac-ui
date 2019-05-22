import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditorToolbarGroupComponent } from "./editor-toolbar-group.component"

describe("EditorToolbarGroupComponent", () => {
    let component: EditorToolbarGroupComponent
    let fixture: ComponentFixture<EditorToolbarGroupComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorToolbarGroupComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorToolbarGroupComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
