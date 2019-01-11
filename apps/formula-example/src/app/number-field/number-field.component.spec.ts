import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { NumberFieldComponent } from "./number-field.component"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { FormulaContext } from "@zodiac-ui/formula"

describe("NumberFieldComponent", () => {
    let component: NumberFieldComponent
    let fixture: ComponentFixture<NumberFieldComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: FormulaContext,
                    useValue: {
                        data: {
                            label: "Test",
                        },
                        model: new FormControl(),
                        resolve: {},
                    },
                },
            ],
            declarations: [NumberFieldComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberFieldComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
