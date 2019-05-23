import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditorNodeViewComponent } from "./editor-node-view.component"

describe("EditorNodeViewComponent", () => {
    let component: EditorNodeViewComponent
    let fixture: ComponentFixture<EditorNodeViewComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorNodeViewComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorNodeViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
