import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { NodePanelComponent } from "./node-panel.component"

describe("NodePanelComponent", () => {
    let component: NodePanelComponent
    let fixture: ComponentFixture<NodePanelComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NodePanelComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(NodePanelComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
