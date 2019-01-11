import { Formula, FormulaArray, FormulaType } from "../interfaces"
import { AbstractControl, FormArray } from "@angular/forms"
import { createModel } from "./utils"

export abstract class FormulaNode {
    parent: FormulaNode
    formula: Formula
    children: FormulaNode[]
    abstract model: AbstractControl

    abstract setValue(value)
}

export class FormulaArrayNode implements FormulaNode {
    parent: FormulaNode
    formula: FormulaArray
    model: FormArray
    children: FormulaNode[]

    constructor(formula, model, parent, children) {
        this.parent = parent
        this.model = model
        this.formula = formula
        this.children = children
    }

    setValue(values: any[]) {
        const len = this.model.controls.length

        values.forEach((value, index) => {
            if (index < len) {
                this.children[index].setValue(value)
            } else {
                const formula = this.formula.children[index % this.formula.children.length]
                const model = createModel(formula, this.model)
                const node = createFormulaNode(formula, model, this)

                node.setValue(value)

                this.children.push(node)
            }
        })

        const valLen = values.length

        this.children.forEach((child, index) => {
            if (index >= valLen) {
                this.model.removeAt(index)
            }
        })
    }
}

export class FormulaControlNode implements FormulaNode {
    parent: FormulaNode
    formula: FormulaArray
    model: FormArray
    children: null

    constructor(formula, model, parent) {
        this.formula = formula
        this.model = model
        this.parent = parent
        this.children = null
    }

    setValue(value) {
        this.model.setValue(value)
    }
}

export class FormulaContainerNode implements FormulaNode {
    parent: FormulaNode
    formula: FormulaArray
    model: FormArray
    children: FormulaNode[]

    constructor(formula, model, parent, children) {
        this.parent = parent
        this.model = model
        this.formula = formula
        this.children = children

        if (!parent) {
            throw new Error("Containers can not be used as a root node")
        }

        if (children.length > 1) {
            throw new Error(`Containers can only have one child`)
        }
    }

    setValue(value) {
        if (this.children) {
            this.children[0].setValue(value)
        }
    }
}

export class FormulaGroupNode implements FormulaNode {
    parent: FormulaNode
    formula: FormulaArray
    model: FormArray
    children: FormulaNode[]

    constructor(formula, model, parent, children) {
        this.parent = parent
        this.model = model
        this.formula = formula
        this.children = children
    }

    setValue(value) {
        this.children.forEach(child => {
            child.setValue(value[child.formula.name])
        })
    }
}

export function createGroupNode(formula, model, parent, children) {
    return new FormulaGroupNode(formula, model, parent, children)
}

export function createControlNode(formula, model, parent) {
    return new FormulaControlNode(formula, model, parent)
}

export function createArrayNode(formula, model, parent, children) {
    return new FormulaArrayNode(formula, model, parent, children)
}

export function createContainerNode(formula, model, parent, children) {
    return new FormulaContainerNode(formula, model, parent, children)
}

export function createFormulaNode(
    formula: Formula,
    model: AbstractControl,
    parent: FormulaNode,
): FormulaNode {
    let children: FormulaNode[] = []
    switch (formula.type) {
        case FormulaType.CONTROL: {
            return createControlNode(formula, model, parent)
        }
        case FormulaType.GROUP: {
            children = formula.children.map(childFormula => {
                const childModel = createModel(childFormula, model)
                return createFormulaNode(childFormula, childModel, parent)
            })

            return createGroupNode(formula, model, parent, children)
        }
        case FormulaType.ARRAY: {
            return createArrayNode(formula, model, parent, children)
        }
        default: {
            children = formula.children.map(childFormula => {
                const childModel = createModel(childFormula, model)
                return createFormulaNode(childFormula, childModel, parent)
            })
            return createContainerNode(formula, model, parent, children)
        }
    }
}
