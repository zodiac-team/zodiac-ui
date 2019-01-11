import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { FormContainerComponent } from "./form-container.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormGroup } from "@angular/forms"

describe("FormContainerComponent", () => {
    let component: FormContainerComponent
    let fixture: ComponentFixture<FormContainerComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        data: {
                            label: "Test",
                        },
                        model: new FormGroup({}),
                        resolve: {},
                    },
                },
            ],
            declarations: [FormContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FormContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
