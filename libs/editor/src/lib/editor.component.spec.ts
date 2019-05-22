import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { EditorComponent } from "./editor.component"

describe("EditorComponent", () => {
    let component: EditorComponent
    let fixture: ComponentFixture<EditorComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    describe("how to create the editor", () => {
        it("should configure the editor state", () => {})
    })
})
