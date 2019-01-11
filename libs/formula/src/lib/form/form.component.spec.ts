import { ComponentFixture, TestBed } from "@angular/core/testing"

import { FormComponent } from "./form.component"
import { FORMULA_OUTLET } from "../constants"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { FormArray, FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { FormulaContext } from "../interfaces"

describe("FormComponent", () => {
    let component: FormComponent
    let fixture: ComponentFixture<FormComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [FormComponent],
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        data: {},
                        model: new FormArray([]),
                        resolve: {},
                    },
                },
                {
                    provide: FORMULA_OUTLET,
                    useValue: {
                        root: {
                            setForm: jest.fn(),
                        },
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
