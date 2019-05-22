import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { IpadDeviceComponent } from "./ipad-device.component"

describe("IpadDeviceComponent", () => {
    let component: IpadDeviceComponent
    let fixture: ComponentFixture<IpadDeviceComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IpadDeviceComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(IpadDeviceComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
