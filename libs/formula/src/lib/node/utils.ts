import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms"
import { Formula, FormulaType } from "../interfaces"

export function isFormArray(model: AbstractControl): model is FormArray {
    return model && model["removeAt"]
}

export function isFormGroup(model: AbstractControl): model is FormGroup {
    return model && model["removeControl"]
}

export function isFormControl(model: AbstractControl): model is FormControl {
    return model && !isFormGroup(model) && !isFormArray(model)
}

export function setParentControl(
    formula: Formula,
    parent: FormGroup | FormArray,
    control: AbstractControl,
) {
    control.setParent(parent)

    if (isFormArray(parent)) {
        parent.push(control)
    }

    if (isFormGroup(parent)) {
        parent.setControl(formula.name, control)
    }
}

export function createModel(formula: Formula, parent: AbstractControl): AbstractControl {
    let model: AbstractControl

    if (isFormControl(parent)) {
        return parent
    }

    switch (formula.type) {
        case FormulaType.CONTROL: {
            model = new FormControl()
            break
        }
        case FormulaType.GROUP: {
            model = new FormGroup({})
            break
        }
        case FormulaType.ARRAY: {
            model = new FormArray([])
            break
        }
        default: {
            return parent
        }
    }

    if (isFormGroup(parent) || isFormArray(parent)) {
        setParentControl(formula, parent, model)
    }

    return model
}
