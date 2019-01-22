import { Injector, NgModuleFactory, Type } from "@angular/core"
import { Observable } from "rxjs"
import { AbstractControl, NgForm } from "@angular/forms"
import { FormulaRenderer } from "./renderer/renderers"
import { FormulaNode } from "./node/nodes"

/**
 *
 */
export type Formula = FormulaControl | FormulaGroup | FormulaArray | FormulaContainer

export enum FormulaType {
    CONTROL,
    GROUP,
    ARRAY,
    CONTAINER,
}

export interface FormulaData {
    placeholder?: string
    label?: string
    [key: string]: any
}

export interface FormulaResolveData {
    [key: string]: Type<any>
}

export type FormulaLoadChildrenCallback = () =>
    | Type<any>
    | NgModuleFactory<any>
    | Promise<Type<any>>
    | Observable<Type<any>>

export type FormulaLoadChildren = string | FormulaLoadChildrenCallback

export interface FormulaControlBase {
    type: FormulaType.CONTROL
}

export interface FormulaControlOptions {
    name: string
    class?: string
    component?: Type<any>
    data?: FormulaData
    default?: any
    canLoad?: any[]
    canActivate?: any[]
    canDeactivate?: any[]
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export type FormulaControl = FormulaControlBase & FormulaControlOptions

export interface FormulaGroupBase {
    type: FormulaType.GROUP
    name: string
    children: Formula[]
}

export interface FormulaGroupOptions {
    name: string
    class?: string
    data?: FormulaData
    component?: Type<any>
    canLoad?: any[]
    canActivateChild?: any[]
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export type FormulaGroup = FormulaGroupBase & FormulaGroupOptions

export interface FormulaArrayBase {
    type: FormulaType.ARRAY
    children: Formula[]
}

export interface FormulaArrayOptions {
    name: string
    class?: string
    data?: FormulaData
    canLoad?: any[]
    canActivateChild?: any[]
    component?: Type<any>
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export type FormulaArray = FormulaArrayBase & FormulaArrayOptions

export interface FormulaContainerBase {
    type: FormulaType.CONTAINER
    children?: Formula[]
}

export interface FormulaContainerOptions {
    name: string
    class?: string
    component?: Type<any>
    data?: FormulaData
    canLoad?: any[]
    canActivateChild?: any[]
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
}

export type FormulaContainer = FormulaContainerBase & FormulaContainerOptions

export type FormulaOptions<T> = T extends FormulaGroup
    ? FormulaGroupOptions
    : T extends FormulaArray
    ? FormulaArrayOptions
    : T extends FormulaContainer
    ? FormulaContainerOptions
    : FormulaControlOptions

export abstract class FormulaContext {
    abstract data: FormulaData
    abstract model: AbstractControl
    abstract resolve: FormulaResolveData
}

export type FormulaRoot = FormulaOutlet & {
    setForm(form: NgForm)
}

export interface FormulaOutlet {
    root: FormulaRoot
    parent: FormulaOutlet
    node: FormulaNode
    renderer: FormulaRenderer
    injector: Injector
}
