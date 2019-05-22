// Hat tip https://github.com/hacdias
// Most of the code from this file comes from:
// https://github.com/codemirror/CodeMirror/blob/master/addon/mode/loadmode.js
import * as BaseCodeMirrorNs from "codemirror"
import "codemirror/addon/mode/overlay"
import "codemirror/addon/mode/multiplex"
import "codemirror/addon/mode/simple"
import "codemirror/mode/meta"

const BaseCodeMirror = BaseCodeMirrorNs

if (!(<any>window).CodeMirror) {
    ;(<any>window).CodeMirror = BaseCodeMirror
}

const loading = {}

function splitCallback(cont, n) {
    let countDown = n
    return function() {
        if (--countDown === 0) cont()
    }
}

export function getMode(name) {
    if (BaseCodeMirror.findModeByName) {
        return BaseCodeMirror.findModeByName(name)
    }
    return null
}

export const globalConfig: any = {}

function ensureDeps(mode, cont) {
    const deps = BaseCodeMirror.modes[mode].dependencies
    if (!deps) return cont(false)
    const missing = []
    for (let i = 0; i < deps.length; ++i) {
        if (!BaseCodeMirror.modes.hasOwnProperty(deps[i])) missing.push(deps[i])
    }
    if (!missing.length) return cont(false)
    const split = splitCallback(cont, missing.length)
    for (let i = 0; i < missing.length; ++i) CodeMirror.requireMode(missing[i], split)
}

export interface ModeInfo {
    name: string
    mimes: string[]
    mode: string
    ext?: string[]
    alias?: string[]
    file?: string
}

export const modeInfo: ModeInfo[] = BaseCodeMirror.modeInfo

export class CodeMirror extends BaseCodeMirror {
    static normalizeKeyMap: any = BaseCodeMirror.normalizeKeyMap
    static Pass: any = BaseCodeMirror.Pass

    constructor(node, opts) {
        BaseCodeMirror.modeURL = globalConfig.modeURL
            ? globalConfig.modeURL
            : "assets/mode/%N/%N.js"

        if (!(<any>window).CodeMirror) {
            // Make CodeMirror available globally so the modes' can register themselves.
        }
        super(node, opts)
    }

    static requireMode(mode, cont) {
        if (typeof mode !== "string") mode = mode.name
        if (BaseCodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont)
        if (loading.hasOwnProperty(mode)) return loading[mode].push(cont)

        const file = BaseCodeMirror.modeURL.replace(/%N/g, mode)

        const script = document.createElement("script")
        script.src = file
        const others = document.getElementsByTagName("script")[0]
        const list = (loading[mode] = [cont])

        BaseCodeMirror.on(script, "load", function() {
            ensureDeps(mode, function() {
                for (let i = 0; i < list.length; ++i) list[i](true)
            })
        })

        others.parentNode.insertBefore(script, others)
    }

    static autoLoadMode(instance, mode) {
        if (BaseCodeMirror.modes.hasOwnProperty(mode)) return

        CodeMirror.requireMode(mode, function() {
            instance.setOption("mode", instance.getOption("mode"))
        })
    }
}
