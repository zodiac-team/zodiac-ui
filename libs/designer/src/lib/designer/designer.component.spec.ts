import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { DesignerComponent } from "./designer.component"

/**
 * **********************************************************************************************
 * File  Edit  Save                           Toolbar                                           *
 * **********************************************************************************************
 *    Add Block Panel   *                                               *    Edit Block Panel
 *                      *    *****************     *****************    *
 *   ******    ******   *    *               *     *               *    *  ********************
 *   *    *    *    *   *    *               *     *               *    *  *                  *
 *   ******    ******   *    *               *     *               *    *  ********************
 *                      *    *               *     *               *    *
 *                      *    *****************     *****************    *  ********************
 *                      *                                  *            *  *                  *
 *                      *                                  *            *  ********************
 *             Drag <*******> Drop                         *            *
 *           or click   *                                  ******************> Click
 *                      *                                               *
 *                      *                                               *
 *                      *                                               *
 * **********************************************************************************************
 */

describe("DesignerComponent", () => {
    let component: DesignerComponent
    let fixture: ComponentFixture<DesignerComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DesignerComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DesignerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
