// Hat tip https://github.com/hacdias
// Most of the code from this file comes from:
// https://github.com/codemirror/CodeMirror/blob/master/addon/mode/loadmode.js
import * as BaseCodeMirror from 'codemirror'
import "codemirror/addon/mode/overlay"
import "codemirror/mode/meta"

// Make CodeMirror available globally so the modes' can register themselves.
(<any>window).CodeMirror = BaseCodeMirror

if (!BaseCodeMirror.modeURL) BaseCodeMirror.modeURL = '../mode/%N/%N.js'

const loading = {}

function splitCallback (cont, n) {
    let countDown = n
    return function () {
        if (--countDown === 0) cont()
    }
}

export function getMode(name) {
    if (BaseCodeMirror.findModeByName) {
        return BaseCodeMirror.findModeByName(name);
    }
    return null
}

function ensureDeps (mode, cont) {
    const deps = CodeMirror.modes[mode].dependencies
    if (!deps) return cont(false)
    const missing = []
    for (let i = 0; i < deps.length; ++i) {
        if (!CodeMirror.modes.hasOwnProperty(deps[i])) missing.push(deps[i])
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
    static modeURL: string
    static modes: {[key: string]: any}

    static normalizeKeyMap: any
    static Pass: any

    constructor(node, opts) {
        super(node, opts)
    }

    static requireMode(mode, cont) {
        if (typeof mode !== 'string') mode = mode.name
        if (CodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont)
        if (loading.hasOwnProperty(mode)) return loading[mode].push(cont)

        const file = CodeMirror.modeURL.replace(/%N/g, mode)

        const script = document.createElement('script')
        script.src = file
        const others = document.getElementsByTagName('script')[0]
        const list = loading[mode] = [cont]

        BaseCodeMirror.on(script, 'load', function () {
            ensureDeps(mode, function () {
                for (let i = 0; i < list.length; ++i) list[i](true)
            })
        })

        others.parentNode.insertBefore(script, others)
    }

    static autoLoadMode(instance, mode) {
        if (CodeMirror.modes.hasOwnProperty(mode)) return

        CodeMirror.requireMode(mode, function () {
            instance.setOption('mode', instance.getOption('mode'))
        })
    }
}

Object.assign(CodeMirror, BaseCodeMirror)
