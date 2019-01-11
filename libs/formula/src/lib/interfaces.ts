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
    [key: string]: any
}

export type FormulaLoadChildrenCallback = () =>
    | Type<any>
    | NgModuleFactory<any>
    | Promise<Type<any>>
    | Observable<Type<any>>

export type FormulaLoadChildren = string | FormulaLoadChildrenCallback

export interface FormulaControl {
    type: FormulaType.CONTROL
    data?: FormulaData
    default?: any
    component: Type<any>
    canLoad?: any[]
    canActivate?: any[]
    canDeactivate?: any[]
    name: string
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export interface FormulaGroup {
    type: FormulaType.GROUP
    data?: FormulaData
    name: string
    component?: Type<any>
    canLoad?: any[]
    canActivateChild?: any[]
    children: Formula[]
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export interface FormulaArray {
    type: FormulaType.ARRAY
    data?: FormulaData
    name: string
    canLoad?: any[]
    canActivateChild?: any[]
    component?: Type<any>
    children: Formula[]
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
    validators?: any[]
    asyncValidators?: any[]
}

export interface FormulaContainer {
    name?: string
    type: FormulaType.CONTAINER
    data?: FormulaData
    component: Type<any>
    canLoad?: any[]
    canActivateChild?: any[]
    children?: Formula[]
    loadChildren?: FormulaLoadChildren
    resolve?: FormulaResolveData
}

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
