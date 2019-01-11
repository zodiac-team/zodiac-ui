import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { PresentationContainerComponent } from "./presentation-container.component"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormControl } from "@angular/forms"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("PresentationContainerComponent", () => {
    let component: PresentationContainerComponent
    let fixture: ComponentFixture<PresentationContainerComponent>

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
                        model: new FormControl(),
                        resolve: {},
                    },
                },
            ],
            declarations: [PresentationContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(PresentationContainerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
