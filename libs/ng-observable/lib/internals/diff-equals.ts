export function diffEquals<T>(base: any, diff: any) {
    const keys = Object.keys(diff)
    for (const key of keys) {
        if (!Object.is(base[key], diff[key])) {
            return false
        }
    }
    return true
}
