import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { BasicEditorComponent } from "./basic-editor.component"

describe("BasicComponent", () => {
    let component: BasicEditorComponent
    let fixture: ComponentFixture<BasicEditorComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BasicEditorComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicEditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
