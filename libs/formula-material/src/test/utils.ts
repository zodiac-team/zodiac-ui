import { TestBed } from "@angular/core/testing"
import { FormulaContext } from "@zodiac-ui/formula"
import { FormControl } from "@angular/forms"
import { MatNativeDateModule } from "@angular/material"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"

export const defaultContext = {
    model: new FormControl(""),
    resolve: {},
    data: {},
}

export function configureTestModule(module) {
    return async () => {
        return TestBed.configureTestingModule({
            imports: [module],
        })
    }
}

export function configureFormulaContext(value: FormulaContext = defaultContext) {
    return () =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FormulaContext,
                    useValue: value,
                },
            ],
        })
}

export function configureDateAdapter(adapterModule = MatNativeDateModule) {
    return () =>
        TestBed.configureTestingModule({
            imports: [adapterModule],
        })
}

export function configureAnimations() {
    return () =>
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
        })
}
