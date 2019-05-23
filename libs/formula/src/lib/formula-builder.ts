import {
    Formula,
    FormulaArray,
    FormulaArrayOptions,
    FormulaContainer,
    FormulaContainerOptions,
    FormulaControl,
    FormulaControlOptions,
    FormulaGroup,
    FormulaGroupOptions,
    FormulaOptions,
    FormulaType,
} from "./interfaces"

export type ExtendFn<T extends (...args: Formula[]) => any> = (
    src: Partial<FormulaOptions<ReturnType<T>>>,
) => T
export type FormulaBuildFn<T> = (...children: (Formula | ((...children: Formula[]) => any))[]) => T

const mapChildren = child => (typeof child === "function" ? child() : child)

export function group(config: FormulaGroupOptions): FormulaBuildFn<FormulaGroup> {
    return function(...children): FormulaGroup {
        return {
            type: FormulaType.GROUP,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }
}

export function control(config?: FormulaControlOptions): FormulaBuildFn<FormulaControl> {
    return function(): FormulaControl {
        return {
            type: FormulaType.CONTROL,
            ...config,
            data: config.data || {},
        }
    }
}

export function array(config: FormulaArrayOptions): FormulaBuildFn<FormulaArray> {
    return function(...children): FormulaArray {
        return {
            type: FormulaType.ARRAY,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }
}

export function container(config: FormulaContainerOptions): FormulaBuildFn<FormulaContainer> {
    return function(...children): FormulaContainer {
        return {
            type: FormulaType.CONTAINER,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }
}

export function extend<T extends Formula>(
    buildFn: FormulaBuildFn<T>,
    opts: Partial<FormulaOptions<ReturnType<FormulaBuildFn<T>>>>,
): FormulaBuildFn<T> {
    return function(...args) {
        const formula = buildFn(...args)

        Object.getOwnPropertyNames(opts).forEach(key => {
            const source = formula[key]
            const value = opts[key]

            if (Array.isArray(value)) {
                formula[key] = [...source, ...value]
            } else if (typeof value === "object" && value !== null) {
                formula[key] = { ...source, ...value }
            } else {
                formula[key] = value
            }
        })

        return formula
    }
}

export class FormulaBuilder {
    public group = group
    public array = array
    public container = container
    public control = control
    public extend = extend
}
