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
export type FormulaBuildFn<T> = ((
    ...children: (Formula | ((...children: Formula[]) => any))[]
) => T) & { extend: ExtendFn<FormulaBuildFn<T>> }

const mapChildren = child => (typeof child === "function" ? child() : child)

export function group(config: FormulaGroupOptions): FormulaBuildFn<FormulaGroup> {
    const fn = function(...children): FormulaGroup {
        return {
            type: FormulaType.GROUP,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }

    Object.assign(fn, {
        extend: extend.bind(null, fn),
    })

    return fn as FormulaBuildFn<FormulaGroup>
}

export function control(config?: FormulaControlOptions): FormulaBuildFn<FormulaControl> {
    const fn = function(): FormulaControl {
        return {
            type: FormulaType.CONTROL,
            ...config,
            data: config.data || {},
        }
    }

    Object.assign(fn, {
        extend: extend.bind(null, fn),
    })

    return fn as FormulaBuildFn<FormulaControl>
}

export function array(config: FormulaArrayOptions): FormulaBuildFn<FormulaArray> {
    const fn = function(...children): FormulaArray {
        return {
            type: FormulaType.ARRAY,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }

    Object.assign(fn, {
        extend: extend.bind(null, fn),
    })

    return fn as FormulaBuildFn<FormulaArray>
}

export function container(config: FormulaContainerOptions): FormulaBuildFn<FormulaContainer> {
    const fn = function(...children): FormulaContainer {
        return {
            type: FormulaType.CONTAINER,
            children: children.map(mapChildren),
            ...config,
            data: config.data || {},
        }
    }

    Object.assign(fn, {
        extend: extend.bind(null, fn),
    })

    return fn as FormulaBuildFn<FormulaContainer>
}

export function extend<T extends (...args: Formula[]) => any>(
    dest: T,
    src: FormulaOptions<ReturnType<T>>,
): T {
    return function(...args) {
        return Object.assign(dest(...args), src)
    } as T
}

export class FormulaBuilder {
    public group = group
    public array = array
    public container = container
    public control = control
    public extend = extend
}
