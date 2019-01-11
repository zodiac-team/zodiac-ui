import { async, ComponentFixture, TestBed, TestBedStatic } from "@angular/core/testing"
import { Component, ViewChild } from "@angular/core"
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing"
import { FormulaDirective } from "./formula.directive"
import { Formula, FormulaType } from "./interfaces"
import { FormulaModule } from "./formula.module"

@Component({
    selector: "z-fake",
    template: `
        <z-formula [formula]="formula" [value]="value"></z-formula>
    `,
})
export class FakeComponent {
    @ViewChild(FormulaDirective)
    public subject: FormulaDirective
    public formula: Formula
    public value: any
}

@Component({
    selector: "z-fake-field",
    template: `
        <input name="fake" />
    `,
})
export class FakeInputComponent {}

export async function renderFormula(fixture: ComponentFixture<any>, formula: Formula, value: any) {
    Object.assign(fixture.componentInstance, {
        formula,
        value,
    })

    fixture.detectChanges()

    await fixture.whenRenderingDone()
}

describe("FormulaDirective", () => {
    let testbed: TestBedStatic
    let fixture: ComponentFixture<FakeComponent>
    let formula: Formula
    let value: any

    beforeEach(() => {
        formula = {
            type: FormulaType.CONTROL,
            name: "test",
            data: {},
            component: FakeInputComponent,
        }

        value = {
            test: "FAKE",
        }
    })

    beforeEach(async(() => {
        testbed = TestBed.configureTestingModule({
            imports: [FormulaModule],
            declarations: [FakeComponent, FakeInputComponent],
            providers: [],
        })

        testbed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [FakeComponent, FakeInputComponent],
            },
        })

        void testbed.compileComponents()
    }))

    beforeEach(() => {
        fixture = testbed.createComponent(FakeComponent)
    })

    it("should create a FormulaDirective", async () => {
        const subject = fixture.componentInstance.subject

        await renderFormula(fixture, formula, value)

        expect(subject).toBeInstanceOf(FormulaDirective)
    })

    it("should throw an error", async () => {
        formula = {
            type: null as FormulaType.CONTROL,
            component: FakeComponent,
            name: "fake",
        }

        value = {
            fake: "FAKE",
        }

        await expect(renderFormula(fixture, formula, value)).rejects.toBeTruthy()
    })

    it("should create a form", async () => {
        await renderFormula(fixture, formula, value)

        expect(fixture.debugElement.nativeElement).toMatchSnapshot()
    })

    it("should be stable", async () => {
        await renderFormula(fixture, formula, value)

        expect(() => fixture.checkNoChanges()).not.toThrowError()
    })

    it("should destroy the form", async () => {
        const subject = fixture.componentInstance.subject

        await renderFormula(fixture, formula, value)

        fixture.componentRef.destroy()

        expect(subject.renderer.destroyed).toBeTruthy()
    })

    describe("when the formula changes", () => {
        beforeEach(async () => {
            await renderFormula(fixture, formula, value)
        })

        it("should render a new form", async () => {
            formula = {
                type: FormulaType.ARRAY,
                name: "fake",
                children: [
                    {
                        type: FormulaType.CONTROL,
                        component: FakeInputComponent,
                        name: "fake",
                    },
                ],
            }

            value = ["fake1", "fake2", "fake3", "fake4"]

            await renderFormula(fixture, formula, value)

            expect(fixture.debugElement.nativeElement).toMatchSnapshot()
        })
    })

    describe("when the value changes", () => {
        it("should patch the value", async () => {
            const subject = fixture.componentInstance.subject
            const expected = "Updated fake value"

            await renderFormula(fixture, formula, expected)

            expect(subject.model.value).toEqual(expected)
        })
    })
})
