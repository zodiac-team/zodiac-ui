import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { TextFieldComponent } from "./text-field.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormControl, ReactiveFormsModule } from "@angular/forms"

describe("TextFieldComponent", () => {
    let component: TextFieldComponent
    let fixture: ComponentFixture<TextFieldComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [TextFieldComponent],
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
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(TextFieldComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
